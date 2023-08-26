import React from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { type PaymentIntent } from "@stripe/stripe-js";
import absoluteUrl from "next-absolute-url";

import { Icon } from "~/components/icons";

import { fetchPostJSON } from "~/helpers/api";
import { getStripe } from "~/lib/stripe";

const Slide2Content = ({
  donationAmount,
  payment,
  paymentIntent,
}: {
  donationAmount: number;
  paymentIntent:
    | "isError"
    | "isFetching"
    | { amount: number; client_secret: string };
}) =>
  paymentIntent === "isError" ? (
    <p>Something went wrong...</p>
  ) : paymentIntent === "isFetching" ? (
    <p>Loading...</p>
  ) : (
    <div className="relative border border-gray-300 px-2 pb-8 pt-2 sm:px-12 sm:pb-16 sm:pt-4">
      <Elements
        stripe={getStripe()}
        options={{
          appearance: {
            variables: {
              colorIcon: "#6772e5",
              focusOutline: "#d3cec6",
              focusBoxShadow: "none",
              colorPrimary: "#bc7229",
              fontFamily: "Karla, Open Sans, Segoe UI, sans-serif",
            },
          },
          clientSecret: paymentIntent.client_secret,
        }}
      >
        <PaymentForm
          donationAmount={donationAmount}
          paymentIntent={paymentIntent}
          payment={payment}
          setErrorMessage={setErrorMessage}
          setPayment={setPayment}
        />
      </Elements>
    </div>
  );

export default Slide2Content;

const PaymentForm = ({
  donationAmount,
  paymentIntent,
  setPayment,
  setErrorMessage,
  payment,
}: {
  donationAmount: number;
  paymentIntent: PaymentIntent;
  setPayment: (arg0: { status: string } | PaymentIntent) => void;
  setErrorMessage: (arg0: string) => void;
  payment: { status: string } | PaymentIntent;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const { origin } = absoluteUrl();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!e.currentTarget.reportValidity()) return;

    if (!elements || !stripe) return;

    setPayment({ status: "processing" });

    const paymentIntentId = paymentIntent.id as string;

    const response = (await fetchPostJSON("/api/payment_intents", {
      amount: donationAmount,
      payment_intent_id: paymentIntentId,
    })) as PaymentIntent;

    setPayment(response);

    if ((response.statusCode as number) === 500) {
      setPayment({ status: "error" });
      setErrorMessage(response.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}/donate-success`,
      },
    });

    if (error) {
      setPayment({ status: "error" });
      setErrorMessage(error.message ?? "An unknown error occurred");
    } else if (paymentIntent) {
      setPayment(paymentIntent);
    }
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          business: {
            name: "The Birch Collective",
          },
        }}
      />
      <div className="mt-8 flex w-full flex-col items-center justify-center">
        <button
          className="flex items-center gap-3 whitespace-nowrap rounded-md bg-displayGreen px-16 py-4 text-xl font-medium text-white"
          type="submit"
          disabled={
            !["initial", "succeeded", "error"].includes(payment.status) ||
            !stripe
          }
        >
          <span className="text-gray-300">
            <Icon.Lock />
          </span>
          Donate £{donationAmount} One-time
        </button>
        <p className="mt-3 text-gray-500">
          * This form is powered and protected by{" "}
          <a href="https://stripe.com" className="underline">
            Stripe
          </a>
        </p>
      </div>
    </form>
  );
};
