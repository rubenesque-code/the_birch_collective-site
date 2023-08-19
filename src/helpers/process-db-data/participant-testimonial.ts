import type { MyDb } from "~/types/database";

const selfValidate = ({
  endorserName,
  text,
}: MyDb["participant-testimonial"]) => {
  const hasRequiredFields = endorserName.length && text.length;

  return Boolean(hasRequiredFields);
};

const selfValidateMany = (
  participantTestimonials: MyDb["participant-testimonial"][],
) => participantTestimonials.filter(selfValidate);

selfValidate.many = selfValidateMany;

const crossProcess = (
  {
    image: testimonialImage,
    ...restTestimonial
  }: MyDb["participant-testimonial"],

  connectedDocs: { images: MyDb["image"][] },
) => {
  const connectedImage = connectedDocs.images.find(
    (image) => image.id === testimonialImage.dbConnect.imageId,
  );

  if (!connectedImage) {
    return "requirements not met" as const;
  }

  const processedImage = {
    connectedImage,
    position: testimonialImage.position,
  };

  return {
    ...restTestimonial,
    image: processedImage,
  };
};

const crossProcessMany = (
  participantTestimonials: MyDb["participant-testimonial"][],
  connectedDocs: {
    images: MyDb["image"][];
  },
) => {
  const processed = participantTestimonials
    .map((testimonial) => crossProcess(testimonial, connectedDocs))
    .flatMap((testimonial) =>
      testimonial !== "requirements not met" ? [testimonial] : [],
    );

  return processed;
};

export type ProcessedParticipantTestimonials = ReturnType<
  typeof crossProcessMany
>;

crossProcess.many = crossProcessMany;

export const processParticipantTestimonial = {
  selfValidate,
  crossProcess,
};
