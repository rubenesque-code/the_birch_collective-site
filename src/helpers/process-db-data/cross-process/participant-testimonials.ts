import type { MyDb } from "~/types/database";

export const participantTestimonial = ({
  connectedDocs,
  participantTestimonial: { image: testimonialImage, ...restTestimonial },
}: {
  participantTestimonial: MyDb["participant-testimonial"];
  connectedDocs: {
    images: MyDb["image"][];
  };
}) => {
  const connectedImage =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    connectedDocs.images.find(
      (image) => image.id === testimonialImage.dbConnect.imageId,
    )!;

  return {
    ...restTestimonial,
    image: {
      connectedImage,
      position: testimonialImage.position,
    },
  };
};
