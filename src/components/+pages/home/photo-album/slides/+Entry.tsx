import "swiper/css";

import React from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";

import type { StaticData } from "../../_static-data";

import type { ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["photoAlbum"]>["entries"];

const Slides = ({ data }: { data: Data }) => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);

  return (
    <div className="absolute h-full w-full overflow-visible">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={(swiper) => setSwiper(swiper)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        lazyPreloadPrevNext={1}
      >
        {data.map(({ image }, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="absolute h-full w-full">
                <StorageImage
                  urls={image.connectedImage.urls}
                  position={image.position}
                  sizes="(max-width: 640px) 90vw, 70vw"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Navigation
        swipeLeft={() => swiper?.slidePrev()}
        swipeRight={() => swiper?.slideNext()}
      />
    </div>
  );
};

export default Slides;

const Navigation = ({
  swipeLeft,
  swipeRight,
}: {
  swipeLeft: () => void;
  swipeRight: () => void;
}) => (
  <div
    className={`absolute left-0 top-0 z-20 flex h-full flex-col justify-center bg-opacity-70 sm:-translate-x-1/2`}
  >
    <div>
      <button
        className={`bg-gray-200 p-xs text-3xl opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
        onClick={swipeLeft}
        type="button"
      >
        <Icon.CaretLeft />
      </button>
      <button
        onClick={swipeRight}
        className={`bg-white p-xs text-3xl opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
        type="button"
      >
        <Icon.CaretRight />
      </button>
    </div>
  </div>
);
