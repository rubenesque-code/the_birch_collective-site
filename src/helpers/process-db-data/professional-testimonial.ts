import { sortByIndex } from "../data/process";
import { notInUse } from "./_helpers";

import type { MyDb } from "~/types/database";

const selfValidate = ({
  endorserName,
  text,
}: MyDb["professional-testimonial"]) => {
  const hasRequiredFields = endorserName.length && text.length;

  return Boolean(hasRequiredFields);
};

const selfValidateMany = (
  professionalTestimonials: MyDb["professional-testimonial"][],
) => professionalTestimonials.filter(selfValidate);

selfValidate.many = selfValidateMany;

const crossProcess = (
  {
    image: testimonialImage,
    ...restTestimonial
  }: MyDb["professional-testimonial"],
  connectedDocs: { images: MyDb["image"][] },
) => {
  const connectedImage = connectedDocs.images.find(
    (image) => image.id === testimonialImage.dbConnections.imageId,
  );

  const processedImage = !connectedImage
    ? notInUse
    : {
        connectedImage,
        position: testimonialImage.position,
      };

  return {
    ...restTestimonial,
    image: processedImage,
  };
};

const crossProcessMany = (
  professionalTestimonials: MyDb["professional-testimonial"][],
  connectedDocs: {
    images: MyDb["image"][];
  },
) => {
  const processed = professionalTestimonials
    .map((testimonial) => crossProcess(testimonial, connectedDocs))
    .sort(sortByIndex);

  return processed;
};

export type ProcessedProfessionalTestimonials = ReturnType<
  typeof crossProcessMany
>;

crossProcess.many = crossProcessMany;

export const processProfessionalTestimonial = {
  selfValidate,
  crossProcess,
};
