import "swiper/css";

import React, { type ReactElement } from "react";
import { useMeasure } from "react-use";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";

import type { StaticData } from "../../_static-data";

import { type ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["photoAlbum"]>;

const PhotoAlbum = ({ data }: { data: Data }) => (
  <div className="ml-md rounded-md bg-[#b1cd84] p-sm">
    <div className="relative h-[400px] overflow-visible">
      <Slides
        entries={data.entries}
        heading={<div className="text-sm text-gray-500">{data.heading}</div>}
      />
    </div>
  </div>
);

export default PhotoAlbum;

const Slides = ({
  heading,
  entries,
}: {
  heading: ReactElement;
  entries: Data["entries"];
}) => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);

  const [containerRef, { width: containerWidth, height: containerHeight }] =
    useMeasure<HTMLDivElement>();

  return (
    <div className="h-full w-full">
      <div
        className="relative flex h-full w-full justify-end"
        ref={containerRef}
      >
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          onSwiper={(swiper) => setSwiper(swiper)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {entries.map((entry, i) => {
            return (
              <SwiperSlide key={i}>
                {containerWidth && containerHeight ? (
                  <>
                    {() => {
                      const aspectRatio =
                        entry.image.connectedImage.naturalDimensions.width /
                        entry.image.connectedImage.naturalDimensions.height;

                      const isLandscape =
                        entry.image.connectedImage.naturalDimensions.width >
                        entry.image.connectedImage.naturalDimensions.height;

                      let width: number;
                      let height: number;

                      if (isLandscape) {
                        width = containerWidth;
                        height = containerWidth / aspectRatio;
                      } else {
                        height = containerHeight;
                        width = containerHeight * aspectRatio;
                      }

                      return (
                        <div
                          className="absolute right-0 top-1/2 grid -translate-y-1/2 place-items-center bg-gray-100"
                          style={{ width, height }}
                        >
                          <StorageImage
                            urls={entry.image.connectedImage.urls}
                            objectFit="contain"
                          />
                        </div>
                      );
                    }}
                  </>
                ) : null}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="flex justify-end">
        <div className="mt-xs inline-flex justify-end gap-xl bg-white/40 px-sm">
          {entries.length > 1 ? (
            <Navigation
              swipeLeft={() => swiper?.slidePrev()}
              swipeRight={() => swiper?.slideNext()}
            />
          ) : null}

          <div>{heading}</div>
        </div>
      </div>
    </div>
  );
};

const Navigation = ({
  swipeLeft,
  swipeRight,
}: {
  swipeLeft: () => void;
  swipeRight: () => void;
}) => (
  <div className="flex gap-md">
    <button
      className={`text-lg opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
      onClick={swipeLeft}
      type="button"
    >
      <Icon.CaretLeft />
    </button>

    <button
      onClick={swipeRight}
      className={`text-lg opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
      type="button"
    >
      <Icon.CaretRight />
    </button>
  </div>
);
