import React, { type ReactElement } from "react";

import { StorageImage } from "~/components/StorageImage";

import { Slides } from "./slides/+Entry";

import { deepSortByIndex } from "~/helpers/data/process";
import { useHovered } from "~/hooks";
import type { MyDb } from "~/types/database";

const ParticipantTestimonials = ({
  staticData,
}: {
  staticData: {
    testimonials: MyDb["participant-testimonial"][];
    images: MyDb["image"][];
  };
}) => {
  const sorted = React.useMemo(
    () => deepSortByIndex(staticData.testimonials),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div>
      <Slides
        numSlidesTotal={sorted.length}
        slides={({ leftMost, rightMost }) =>
          sorted.map((testimonial, i) => (
            <TestimonialWrapper
              slidesView={{
                isFirst: i === leftMost,
                isLast: i === rightMost,
              }}
              key={i}
            >
              <TestimonialActual
                testimonial={testimonial}
                image={
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  staticData.images.find(
                    (image) => image.id === testimonial.image.dbConnect.imageId,
                  )!
                }
              />
            </TestimonialWrapper>
          ))
        }
      />
    </div>
  );
};

export default ParticipantTestimonials;

const TestimonialWrapper = ({
  children,
  slidesView,
}: {
  children: ReactElement;
  slidesView: {
    isFirst?: boolean;
    isLast?: boolean;
  };
}) => {
  const [isHovered, { hoverHandlers }] = useHovered();

  return (
    <div
      className={`relative aspect-[3/4] border-2 border-white transition-transform duration-[275ms] ease-[cubic-bezier(0.24,0.26,0.2,1)] ${
        isHovered ? "md:scale-115" : "scale-100"
      } ${
        slidesView.isFirst
          ? "origin-left"
          : slidesView.isLast
          ? "origin-right"
          : ""
      }`}
      {...hoverHandlers}
    >
      {children}
    </div>
  );
};

const TestimonialActual = ({
  testimonial,
  image,
}: {
  image: MyDb["image"];
  testimonial: MyDb["participant-testimonial"];
}) => {
  return (
    <>
      <div className="absolute h-full w-full">
        <StorageImage urls={image.urls} position={testimonial.image.position} />
      </div>
      <div className="absolute bottom-0 z-10 h-4/5 w-full bg-gradient-to-t from-black to-transparent">
        <div className="absolute bottom-0 z-10 flex h-[63%] w-full flex-col justify-end gap-sm p-sm text-center text-lg text-white">
          <div className="overflow-auto scrollbar-hide">{testimonial.text}</div>
          <div className="shrink-0 font-medium">
            <p>{testimonial.endorserName}</p>
          </div>
        </div>
      </div>
    </>
  );
};
