import "swiper/css";

import React from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";

import type { StaticData } from "../../_static-data";

import { type MyExclude } from "~/types/utilities";

type Data = MyExclude<StaticData["page"]["posters"], "not in use">;

// TODO: need to position posters to the right
// TODO: complete download button.

const PosterSlides = ({ data }: { data: Data }) => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);

  return (
    <div className="relative flex h-full w-full justify-end">
      <div className="absolute -bottom-xxxs left-xl translate-y-full  text-gray-500">
        <Icon.Download />
      </div>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={(swiper) => setSwiper(swiper)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        {data.map((entry, i) => {
          return (
            <SwiperSlide key={i}>
              <StorageImage
                urls={entry.connectedImage.urls}
                objectFit="contain"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {data.length > 1 ? (
        <Navigation
          swipeLeft={() => swiper?.slidePrev()}
          swipeRight={() => swiper?.slideNext()}
        />
      ) : null}
    </div>
  );
};

export default PosterSlides;

const Navigation = ({
  swipeLeft,
  swipeRight,
}: {
  swipeLeft: () => void;
  swipeRight: () => void;
}) => (
  <div
    className={`absolute bottom-0 left-0 z-20 flex h-full -translate-x-1/2 flex-col justify-end bg-opacity-70`}
  >
    <div>
      <button
        className={`bg-gray-200 p-xs text-xl opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
        onClick={swipeLeft}
        type="button"
      >
        <Icon.CaretLeft />
      </button>
      <button
        onClick={swipeRight}
        className={`bg-white p-xs text-xl opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
        type="button"
      >
        <Icon.CaretRight />
      </button>
    </div>
  </div>
);
