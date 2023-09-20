import { Icon } from "~/components/icons";

import { ComponentCx, StripeCx } from "./_state";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import { SwiperApiCx } from "./swiper-base/_state";
import SwiperBase from "./swiper-base/+Entry";

// todo: see slide 2

const NewOne = () => (
  <SwiperApiCx.Provider>
    <ComponentCx.Provider>
      <StripeCx.Provider>
        <div className="w-[650px] border border-brandGreen bg-white">
          <Header />
          <Body />
        </div>
      </StripeCx.Provider>
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
    <SwiperBase.Slide key="slide-0">
      <Slide1 />
    </SwiperBase.Slide>
    <SwiperBase.Slide key="slide-1">
      <Slide2 />
    </SwiperBase.Slide>
  </SwiperBase>
);