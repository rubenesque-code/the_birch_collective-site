import "swiper/css";

import React from "react";
import { type Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Icon } from "~/components/icons";

const PaymentSwiper = ({
  children,
  onGoToSlide2,
}: {
  children: (arg0: {
    goToSlide1: () => void;
    goToSlide2: () => void;
  }) => React.ReactNode;
  onGoToSlide2: (arg0: { goToSlide2: () => void }) => void;
}) => {
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const handleGoToSlide2 = () => {
    onGoToSlide2({ goToSlide2: () => swiper?.slideTo(1) });
    setCurrentSlideIndex(1);
  };

  return (
    <div className="w-[650px] border border-brandGreen bg-white">
      <div className="flex justify-between bg-displayGreen px-16 py-sm text-white">
        <div className="text-lg ">
          {currentSlideIndex === 0 ? "Choose amount" : "Payment"}
        </div>
        <div className="flex items-center gap-sm">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                swiper?.slideTo(0);
                setCurrentSlideIndex(0);
              }}
              type="button"
            >
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
          {/* <button type="button">
            <Icon.ArrowRight />
          </button> */}
        </div>
      </div>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={(swiper) => setSwiper(swiper)}
        allowTouchMove={false}
      >
        {swiper
          ? children({
              goToSlide1: () => {
                swiper.slideTo(1);
                setCurrentSlideIndex(0);
              },
              goToSlide2: () => {
                swiper.slideTo(2);
                setCurrentSlideIndex(1);
              },
            })
          : null}
      </Swiper>
    </div>
  );
};

export default PaymentSwiper;

PaymentSwiper.Slide = SwiperSlide;
