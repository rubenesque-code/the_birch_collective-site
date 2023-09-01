import "swiper/css";

import React from "react";
import { Transition } from "@headlessui/react";
import { saveAs } from "file-saver";
import { useMeasure } from "react-use";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";
import { WithTooltip } from "~/components/WithTooltip";

import type { StaticData } from "../../_static-data";

import type { MyDb } from "~/types/database";
import { type MyExclude } from "~/types/utilities";

type Data = {
  entries: MyExclude<StaticData["page"]["posters"], "not in use">;
  programmeTitle: string;
};

// TODO: need to position posters to the right
// TODO: complete download button.

const PhotoAlbum = ({ data }: { data: Data }) => (
  <div className="relative h-[400px] overflow-visible">
    <Slides
      entries={data.entries}
      heading={<div className="text-sm text-gray-500">Posters!</div>}
      programmeTitle={data.programmeTitle}
    />
  </div>
);

export default PhotoAlbum;

const Slides = ({
  heading,
  entries,
  programmeTitle,
}: {
  heading: React.ReactElement;
  entries: Data["entries"];
  programmeTitle: string;
}) => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [showZoomedImage, setShowZoomedImage] = React.useState(false);

  React.useEffect(() => {
    if (showZoomedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showZoomedImage]);

  const currentSlide = entries[currentSlideIndex];

  const [containerRef, { width: containerWidth, height: containerHeight }] =
    useMeasure<HTMLDivElement>();

  return (
    <>
      <ZoomedImage
        image={currentSlide.connectedImage}
        show={showZoomedImage}
        close={() => setShowZoomedImage(false)}
      />
      <div className="h-full w-full">
        <div
          className="relative flex h-full w-full justify-end"
          ref={containerRef}
        >
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            onSwiper={(swiper) => setSwiper(swiper)}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            {entries.map((entry, i) => (
              <SwiperSlide key={i}>
                {containerWidth && containerHeight ? (
                  <SwiperSlideContent
                    containerDimensions={{
                      height: containerHeight,
                      width: containerWidth,
                    }}
                    entry={entry}
                    onClick={() => setShowZoomedImage(true)}
                  />
                ) : null}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-end">
          <div className="mt-xs inline-flex items-center justify-end gap-xl">
            {entries.length > 1 ? (
              <Navigation
                swipeLeft={() => {
                  if (currentSlideIndex === 0) {
                    return;
                  }

                  swiper?.slidePrev();

                  setCurrentSlideIndex(currentSlideIndex - 1);
                }}
                swipeRight={() => {
                  if (currentSlideIndex === entries.length - 1) {
                    return;
                  }

                  swiper?.slideNext();

                  setCurrentSlideIndex(currentSlideIndex + 1);
                }}
              />
            ) : null}

            <div>{heading}</div>

            <WithTooltip text="Download poster">
              <div
                className="mr-xs cursor-pointer text-gray-400 transition-colors duration-75 ease-in-out hover:text-gray-600"
                onClick={() => {
                  saveAs(
                    currentSlide.connectedImage.urls.large,
                    `${programmeTitle} poster ${
                      entries.length > 1 ? currentSlideIndex + 1 : ""
                    }`,
                  );
                }}
              >
                <Icon.Download />
              </div>
            </WithTooltip>
          </div>
        </div>
      </div>
    </>
  );
};

const SwiperSlideContent = ({
  containerDimensions,
  entry,
  onClick,
}: {
  containerDimensions: { width: number; height: number };
  entry: Data["entries"][number];
  onClick: () => void;
}) => {
  const [width, setWidth] = React.useState<number | null>(null);
  const [height, setHeight] = React.useState<number | null>(null);

  React.useEffect(() => {
    const aspectRatio =
      entry.connectedImage.naturalDimensions.width /
      entry.connectedImage.naturalDimensions.height;

    const isLandscape =
      entry.connectedImage.naturalDimensions.width >
      entry.connectedImage.naturalDimensions.height;

    if (isLandscape) {
      setWidth(containerDimensions.width);
      setHeight(containerDimensions.width / aspectRatio);
    } else {
      setHeight(containerDimensions.height);
      setWidth(containerDimensions.height * aspectRatio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!width || !height) {
    return null;
  }

  return (
    <div
      className="absolute right-0 top-1/2 grid -translate-y-1/2 cursor-zoom-in place-items-center bg-gray-100"
      onClick={onClick}
      style={{ width, height }}
    >
      <StorageImage urls={entry.connectedImage.urls} objectFit="contain" />
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

const ZoomedImage = ({
  show,
  image,
  close,
}: {
  show: boolean;
  image: MyDb["image"];
  close: () => void;
}) => (
  <Transition show={show}>
    <Transition.Child
      as="div"
      className="fixed inset-0 z-[60] overflow-auto bg-white/90"
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer rounded-md px-sm py-xs transition-all duration-75 ease-in-out hover:bg-gray-100"
          onClick={close}
        >
          Close
        </div>
      </div>
      <div
        className={`relative w-full min-w-[400px]`}
        style={{
          aspectRatio:
            image.naturalDimensions.width / image.naturalDimensions.height,
        }}
      >
        <StorageImage urls={image.urls} objectFit="contain" />
      </div>
    </Transition.Child>
  </Transition>
);
