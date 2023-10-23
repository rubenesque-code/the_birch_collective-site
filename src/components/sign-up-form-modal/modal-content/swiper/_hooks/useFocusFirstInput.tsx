import React from "react";

import { SwiperApiCx } from "../_state";

export const useFocusFirstInput = (slideIndex: number) => {
  const [inputNode, setInputNode] = React.useState<
    HTMLInputElement | HTMLTextAreaElement | null
  >(null);

  const swiperApi = SwiperApiCx.use();

  React.useEffect(() => {
    if (inputNode && swiperApi.currentSlideIndex === slideIndex) {
      inputNode.focus();
    }
  }, [inputNode, swiperApi.currentSlideIndex, slideIndex]);

  return {
    setInputNode,
  };
};
