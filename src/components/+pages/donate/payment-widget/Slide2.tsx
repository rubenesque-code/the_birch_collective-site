import React from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { type Stripe, type StripeElements } from "@stripe/stripe-js";
import absoluteUrl from "next-absolute-url";

import { Icon } from "~/components/icons";

import { ComponentCx, StripeCx } from "./_state";

// todo: need access to birch stripe account.
// have set donation amount to 1 pound below

const Slide2 = () => {
  const { paymentIntentMutation, loadStripeQuery } = StripeCx.use();

  console.log("paymentIntentMutation:", paymentIntentMutation);

  const { donationAmount } = ComponentCx.use();

  React.useEffect(() => {
    if (
      paymentIntentMutation.data?.amount ===
      (donationAmount as number) * 100
    ) {
      return;
    }

    paymentIntentMutation.mutate({ amount: 1 });
    // paymentIntentMutation.mutate({ amount: donationAmount as number });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return paymentIntentMutation.isLoading || loadStripeQuery.isLoading ? (
    <p>Loading...</p>
  ) : paymentIntentMutation.isError ||
    !paymentIntentMutation.data ||
    loadStripeQuery.isError ||
    !loadStripeQuery.data ? (
    <p>Something went wrong </p>
  ) : (
    <div className="relative border border-gray-300 px-2 pb-8 pt-2 sm:px-12 sm:pb-16 sm:pt-4">
      <Elements
        stripe={loadStripeQuery.data}
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
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          clientSecret: paymentIntentMutation.data.client_secret!,
        }}
      >
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Slide2;

const PaymentForm = () => {
  // · below stripe hooks return positive because load-stripe passed as resolved to the ElementsProvider above
  const stripe = useStripe() as Stripe;
  const elements = useElements() as StripeElements;

  const { donationAmount } = ComponentCx.use();

  // const { paymentIntentMutation } = StripeCx.use();

  const { origin } = absoluteUrl();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!e.currentTarget.reportValidity()) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}/donate-success`,
      },
    });

    console.log("error:", error);
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
          /*           disabled={
            !["initial", "succeeded", "error"].includes(payment.status) ||
            !stripe
          } */
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
