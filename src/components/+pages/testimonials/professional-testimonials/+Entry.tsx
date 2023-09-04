import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";

import type { StaticData } from "../_static-data";

const ProfessionalTestimonials = ({
  pageData,
  testimonials,
}: {
  testimonials: StaticData["professionalTestimonials"];
  pageData: StaticData["page"]["professionals"];
}) => (
  <div className="group/testimonials">
    <Ui.Section.Heading className="text-brandOrange">
      {pageData.heading}
    </Ui.Section.Heading>

    {pageData.text.length ? (
      <Ui.Section.Description>{pageData.text}</Ui.Section.Description>
    ) : null}

    <div className="mt-xl grid grid-cols-1 gap-xl">
      {testimonials.map((testimonial, i) => (
        <Testimonial
          align={i % 2 === 0 ? "left" : "right"}
          data={testimonial}
          key={testimonial.id}
        />
      ))}
    </div>
  </div>
);

export default ProfessionalTestimonials;

const Testimonial = ({
  align,
  data: { endorserName, endorserTitle, image, text },
}: {
  data: StaticData["professionalTestimonials"][number];
  align: "left" | "right";
}) => (
  <div className={`flex flex-col ${align === "right" ? "justify-end" : ""}`}>
    <div
      className={`flex items-center gap-md ${
        align === "right" ? "flex-row-reverse " : ""
      }`}
    >
      {image === "not in use" ? null : (
        <div className="group/testimonial-image relative h-[80px] w-[80px] shrink-0 rounded-full">
          <StorageImage
            urls={image.connectedImage.urls}
            position={image.position}
            isCircle
            sizes="120px"
          />
        </div>
      )}

      <div>
        <div className="text-xl font-semibold text-brandGreen">
          {endorserName}
        </div>
        {endorserTitle.length ? (
          <div
            className={`mt-xxs  text-lg text-brandBrown ${
              align === "right" ? "text-right" : ""
            }`}
          >
            {endorserTitle}
          </div>
        ) : null}
      </div>
    </div>

    <div
      className={`custom-prose prose mt-sm max-w-[600px] border-gray-100 ${
        align === "right"
          ? "ml-auto border-r-4 pr-md text-right"
          : "border-l-4 pl-md"
      }`}
    >
      {text}
    </div>
  </div>
);
