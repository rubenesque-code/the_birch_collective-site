import React from "react";
import { Transition } from "@headlessui/react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { type Stripe, type StripeElements } from "@stripe/stripe-js";
import absoluteUrl from "next-absolute-url";
import { useMutation } from "react-query";

import { Icon } from "~/components/icons";

import { ComponentCx, StripeCx } from "./_state";

// todo: need access to birch stripe account.
// have set donation amount to 1 pound below

const Slide2 = () => {
  const { paymentIntentMutation, loadStripeQuery } = StripeCx.use();

  const { donationAmount } = ComponentCx.use();

  React.useEffect(() => {
    if (
      paymentIntentMutation.data?.amount ===
      (donationAmount as number) * 100
    ) {
      return;
    }

    paymentIntentMutation.mutate({ amount: donationAmount as number });

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
    <div className="relative px-2 pb-8 pt-2 sm:px-12 sm:pb-16 sm:pt-4">
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
  const { paymentIntentMutation } = StripeCx.use();

  // · below stripe hooks return positive because load-stripe passed as resolved to the ElementsProvider above
  const stripe = useStripe() as Stripe;
  const elements = useElements() as StripeElements;

  const { donationAmount } = ComponentCx.use();

  // const { paymentIntentMutation } = StripeCx.use();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const confirmPaymenMutation = useMutation(stripe.confirmPayment);

  const { origin } = absoluteUrl();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!e.currentTarget.reportValidity()) return;

    await elements.submit();

    confirmPaymenMutation.mutate({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientSecret: paymentIntentMutation.data!.client_secret!,
      confirmParams: {
        return_url: `${origin}/donate-success`,
      },
      elements,
    });

    /*     const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}/donate-success`,
      },
    }); */

    // console.log("error:", error);
  };

  return (
    <>
      <form className="mt-lg" onSubmit={handleSubmit}>
        <PaymentElement
          options={{
            business: {
              name: "The Birch Collective",
            },
          }}
        />
        <div className="mt-xl flex w-full flex-col items-center justify-center">
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

      <Transition
        as="div"
        className="fixed inset-0 z-[60] grid place-items-center overflow-auto bg-white/90"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={confirmPaymenMutation.status !== "idle"}
      >
        <div>
          {confirmPaymenMutation.status === "error"
            ? "payment error"
            : confirmPaymenMutation.status === "loading"
            ? "connecting payment..."
            : "payment success"}
        </div>
      </Transition>
    </>
  );
};
