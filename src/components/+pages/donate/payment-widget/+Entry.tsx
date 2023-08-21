import React from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { type PaymentIntent } from "@stripe/stripe-js";
import absoluteUrl from "next-absolute-url";
import { useQuery } from "react-query";

import { Icon } from "~/components/icons";

import Swiper from "./Swiper";

import { fetchPostJSON } from "~/helpers/api";
import { getStripe } from "~/lib/stripe";

type MyPaymentIntentRes = { amount: number; client_secret: string };

const PaymentWidget = () => {
  const [donationAmount, setDonationAmount] = React.useState<
    number | "not-selected"
  >("not-selected");
  const [showNoAmountSelectedError, setShowNoAmountSelectedError] =
    React.useState(false);

  const paymentIntentQuery = useQuery(
    "payment-intent",
    async () =>
      (await fetchPostJSON("/api/payment_intents", {
        amount: 10,
      })) as Promise<MyPaymentIntentRes>,
  );

  const onSetDonationAmount = (value: number) => {
    setDonationAmount(value);
    setShowNoAmountSelectedError(false);
  };

  return (
    <Swiper
      onGoToSlide2={({ goToSlide2 }) => {
        if (donationAmount === "not-selected") {
          setShowNoAmountSelectedError(true);
          return;
        }
        goToSlide2();
      }}
    >
      {({ goToSlide1, goToSlide2 }) => [
        <Swiper.Slide key="slide-0">
          <Slide1Content
            donationAmount={donationAmount}
            setDonationAmount={onSetDonationAmount}
            showNoAmountSelectedError={showNoAmountSelectedError}
            onClickContinue={() => {
              if (donationAmount === "not-selected") {
                setShowNoAmountSelectedError(true);
                return;
              }
              goToSlide2();
            }}
          />
        </Swiper.Slide>,

        <Swiper.Slide key="slide-1">
          <Slide2Content
            donationAmount={donationAmount as number}
            paymentIntent={
              paymentIntentQuery.isError
                ? "isError"
                : paymentIntentQuery.isFetching
                ? "isFetching"
                : !paymentIntentQuery.data?.amount ||
                  !paymentIntentQuery.data.client_secret
                ? "isError"
                : {
                    amount: paymentIntentQuery.data.amount,
                    client_secret: paymentIntentQuery.data.client_secret,
                  }
            }
          />
        </Swiper.Slide>,
      ]}
    </Swiper>
  );
};

export default PaymentWidget;

const donationAmountArr = [5, 10, 25, 50, 100, 250];

const Slide1Content = ({
  donationAmount,
  setDonationAmount,
  showNoAmountSelectedError,
  onClickContinue,
}: {
  donationAmount: number | "not-selected";
  setDonationAmount: (amount: number) => void;
  showNoAmountSelectedError: boolean;
  onClickContinue: () => void;
}) => (
  <div className="grid columns-1 place-items-center rounded-sm border border-gray-300 pb-8 sm:pb-16">
    <div>
      <div className="mt-8 w-full">
        <p className="inline-block rounded-sm  bg-brandGreen p-2 text-white ">
          One-time
        </p>
      </div>
      <div className="mb-4 mt-8 grid grid-cols-3 gap-3">
        {donationAmountArr.map((amount) => (
          <DonationButton
            amount={amount}
            isSelected={donationAmount === amount}
            onClick={() => setDonationAmount(amount)}
            key={`donation-amount_${amount}`}
          />
        ))}
      </div>
      <div>
        <CustomDonationInput
          value={donationAmount}
          onChange={(amount) => setDonationAmount(amount)}
        />
      </div>
      <p
        className={`mt-xs text-red-500 transition-opacity ease-in-out ${
          showNoAmountSelectedError ? "opacity-100" : "opacity-0"
        }`}
      >
        Please select or enter an amount
      </p>
    </div>
    <button
      className="mt-5 flex items-center gap-1 rounded-sm bg-displayGreen px-6 py-2 text-xl font-bold text-white sm:px-10 sm:py-5"
      type="button"
      onClick={onClickContinue}
    >
      <span>Continue</span>
      <Icon.ArrowRight weight="bold" />
    </button>
  </div>
);

const DonationButton = ({
  amount,
  isSelected,
  onClick,
}: {
  amount: number;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    className={`rounded-md border-2 border-gray-300 px-6 py-2 text-xl font-semibold text-displayGreen transition-all ease-in-out sm:px-8 sm:py-4 ${
      isSelected ? "bg-gray-100" : ""
    }`}
    onClick={onClick}
    type="button"
  >
    £{amount}
  </button>
);

const CustomDonationInput = ({
  value,
  onChange,
}: {
  value: number | "not-selected";
  onChange: (amount: number) => void;
}) => {
  return (
    <div className="relative flex flex-col">
      <label className="text-gray-400">Enter amount</label>

      <div className="relative">
        <input
          className="w-[300px] rounded-md border-2 border-gray-300 px-6 py-2 text-xl font-semibold text-displayGreen sm:px-10 sm:py-5"
          type="number"
          min={1}
          step={1}
          value={value === "not-selected" ? "" : value}
          onChange={(e) => {
            // * only allow whole numbers
            const value = Math.round(Number(e.target.value));
            onChange(value);
          }}
          placeholder="Custom amount"
        />
        <p className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-displayGreen">
          £
        </p>
      </div>
    </div>
  );
};

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
        {/*         <PaymentForm
          donationAmount={donationAmount}
          paymentIntent={paymentIntent}
          payment={payment}
          setErrorMessage={setErrorMessage}
          setPayment={setPayment}
        /> */}
      </Elements>
    </div>
  );

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

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!e.currentTarget.reportValidity()) return;

    if (!elements || !stripe) return;

    setPayment({ status: "processing" });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const paymentIntentId = paymentIntent.id as string;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = (await fetchPostJSON("/api/payment_intents", {
      amount: donationAmount,
      payment_intent_id: paymentIntentId,
    })) as PaymentIntent;
    // })) as { statusCode: number; message: string };

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
      // todo: setPayment here is necessary? - at this point payment is processed and redirect happens? - only see this section if there's an error?

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
