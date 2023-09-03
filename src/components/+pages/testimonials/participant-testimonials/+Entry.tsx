import { type ReactElement } from "react";

import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";

import { type StaticData } from "../_static-data";
import { Slides } from "./slides/+Entry";

import { useHovered } from "~/hooks";

const ParticipantTestimonials = ({
  pageData,
  testimonials,
}: {
  testimonials: StaticData["participantTestimonials"];
  pageData: StaticData["page"]["participants"];
}) => (
  <div>
    <Ui.Section.Heading className="text-brandOrange">
      {pageData.heading}
    </Ui.Section.Heading>
    {pageData.text.length ? (
      <Ui.Section.Description>{pageData.text}</Ui.Section.Description>
    ) : null}

    <Ui.Section.VerticalSpace />

    {/* // · -my-[50px] because 50px padding added within Slides to make space for hover scale-up effect. */}
    <div className="-my-[50px]">
      <Slides
        numSlidesTotal={testimonials.length}
        slides={({ leftMost, rightMost }) =>
          testimonials.map((testimonial, i) => (
            <TestimonialWrapper
              slidesView={{
                isFirst: i === leftMost,
                isLast: i === rightMost,
              }}
              key={i}
            >
              <Testimonial testimonial={testimonial} />
            </TestimonialWrapper>
          ))
        }
      />
    </div>
  </div>
);

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

const Testimonial = ({
  testimonial,
}: {
  testimonial: StaticData["participantTestimonials"][number];
}) => (
  <>
    <div className="absolute h-full w-full">
      <StorageImage
        urls={testimonial.image.connectedImage.urls}
        position={testimonial.image.position}
      />
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
