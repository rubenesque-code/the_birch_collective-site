import type { MyDb } from "~/types/database";

export const partner = ({
  connectedDocs,
  partner: { image: partnerImage, ...restTestimonial },
}: {
  partner: MyDb["partner"];
  connectedDocs: {
    images: MyDb["image"][];
  };
}) => {
  const connectedImage =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    connectedDocs.images.find(
      (image) => image.id === partnerImage.dbConnections.imageId,
    )!;

  return {
    ...restTestimonial,
    image: {
      connectedImage,
    },
  };
};
