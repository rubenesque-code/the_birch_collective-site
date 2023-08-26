import "swiper/css";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperApiCx } from "./_state";

const SwiperBase = ({ children }: { children: React.ReactNode }) => {
  const { setSwiper } = SwiperApiCx.use();

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSwiper={setSwiper}
      allowTouchMove={false}
    >
      {children}
    </Swiper>
  );
};

export default SwiperBase;

SwiperBase.Slide = SwiperSlide;
