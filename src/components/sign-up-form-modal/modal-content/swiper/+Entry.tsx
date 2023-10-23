import "swiper/css";

import React from "react";
import { Swiper } from "swiper/react";

import { SwiperApiCx } from "./_state";
import { slides } from "./Slides";

const Container = () => {
  const { setSwiper } = SwiperApiCx.use();

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      direction="horizontal"
      onSwiper={setSwiper}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      allowTouchMove={false}
      simulateTouch={false}
    >
      {slides}
    </Swiper>
  );
};

export default Container;
