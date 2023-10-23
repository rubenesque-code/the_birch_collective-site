import React from "react";
import { type Swiper as SwiperType } from "swiper";

type ContextValue = {
  currentSlideIndex: number;
  goToPrevSlide: () => void;
  goToNextSlide: () => void;
  setSwiper: (swiper: SwiperType) => void;
  numSlides: number;
};

const Context = React.createContext<ContextValue | null>(null);

const Provider = ({
  children,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
}) => {
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const goToNextSlide = () => {
    if (!swiper) {
      return;
    }

    const numSlides = swiper.slides.length;

    if (currentSlideIndex === numSlides - 1) {
      return;
    }

    swiper.slideNext();

    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const goToPrevSlide = () => {
    if (!swiper) {
      return;
    }

    if (currentSlideIndex === 0) {
      return;
    }

    swiper.slidePrev();

    setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const numSlides = !swiper?.slides ? 0 : swiper.slides.length;

  const value: ContextValue = {
    currentSlideIndex,
    goToPrevSlide,
    goToNextSlide,
    setSwiper,
    numSlides,
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
};

const useContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("SwiperApiCx.use must be used within its provider!");
  }

  return context;
};

function SwiperApiCx() {
  throw new Error(
    "SwiperApiCx exists for naming purposes only and should not be used as a component",
  );
}

export { SwiperApiCx };

SwiperApiCx.Provider = Provider;
SwiperApiCx.use = useContext;
