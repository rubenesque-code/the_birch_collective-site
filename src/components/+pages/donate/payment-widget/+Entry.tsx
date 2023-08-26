import React from "react";
import { useQuery } from "react-query";

import { Icon } from "~/components/icons";

import { ComponentCx } from "./_state";
import Slide1 from "./Slide1";
import { SwiperApiCx } from "./swiper-base/_state";
import SwiperBase from "./swiper-base/+Entry";

import { fetchPostJSON } from "~/helpers/api";

const NewOne = () => (
  <SwiperApiCx.Provider>
    <ComponentCx.Provider>
      <div className="w-[650px] border border-brandGreen bg-white">
        <Header />
        <Body />
      </div>
    </ComponentCx.Provider>
  </SwiperApiCx.Provider>
);

export default NewOne;

const Header = () => {
  const { currentSlideIndex, goToSlide } = SwiperApiCx.use();
  const { handleGoToSlide2 } = ComponentCx.use();

  return (
    <div className="flex justify-between bg-displayGreen px-16 py-sm text-white">
      <div className="text-lg ">
        {currentSlideIndex === 0 ? "Choose amount" : "Payment"}
      </div>

      <div className="flex items-center gap-sm">
        <div className="flex items-center gap-1">
          <button onClick={() => goToSlide(0)} type="button">
            <Icon.Circle
              weight={currentSlideIndex === 0 ? "fill" : "bold"}
              color="white"
            />
          </button>

          <button onClick={handleGoToSlide2} type="button">
            <Icon.Circle
              weight={currentSlideIndex === 1 ? "fill" : "bold"}
              color="white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const Body = () => (
  <SwiperBase>
    [
    <SwiperBase.Slide key="slide-0">
      <Slide1 />
    </SwiperBase.Slide>
    ,
    {/* <Swiper.Slide key="slide-1">
        <Slide2Content />
      </Swiper.Slide> */}
    , ]
  </SwiperBase>
);

type MyPaymentIntentRes = { amount: number; client_secret: string };

const PaymentWidget = () => {
  const [donationAmount, setDonationAmount] = React.useState<
    number | "not-selected"
  >("not-selected");

  const [showAmountNotSelectedError, setShowAmountNotSelectedError] =
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
    setShowAmountNotSelectedError(false);
  };

  return (
    <SwiperBase
      onGoToSlide2={({ goToSlide2 }) => {
        if (donationAmount === "not-selected") {
          setShowAmountNotSelectedError(true);
          return;
        }
        goToSlide2();
      }}
    >
      {({ goToSlide1, goToSlide2 }) => [
        <SwiperBase.Slide key="slide-0">
          <Slide1Content
            donationAmount={donationAmount}
            setDonationAmount={onSetDonationAmount}
            showNoAmountSelectedError={showAmountNotSelectedError}
            onClickContinue={() => {
              if (donationAmount === "not-selected") {
                setShowAmountNotSelectedError(true);
                return;
              }
              goToSlide2();
            }}
          />
        </SwiperBase.Slide>,

        <SwiperBase.Slide key="slide-1">
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
        </SwiperBase.Slide>,
      ]}
    </SwiperBase>
  );
};
