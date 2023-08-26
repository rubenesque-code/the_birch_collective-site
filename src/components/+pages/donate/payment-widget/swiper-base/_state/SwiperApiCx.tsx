import React from "react";
import { type Swiper as SwiperType } from "swiper";

type ContextValue = {
  currentSlideIndex: number;
  goToSlide: (slideIndex: number) => void;
  setSwiper: (swiper: SwiperType) => void;
  swiperStatus: "loading" | "ready";
};

const Context = React.createContext<ContextValue | null>(null);

const Provider = ({
  children,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
}) => {
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  console.log("swiper:", swiper);

  const value: ContextValue = {
    currentSlideIndex,
    goToSlide: (slideIndex) => {
      swiper?.slideTo(slideIndex);
      setCurrentSlideIndex(slideIndex);
    },
    setSwiper,
    swiperStatus: !swiper ? "loading" : "ready",
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
