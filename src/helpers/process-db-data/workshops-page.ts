import { notInUse } from "./_helpers";

import type { MyDb } from "~/types/database";

const crossProcess = (
  { bannerImage, ...restPage }: MyDb["pages"]["workshops"],
  connectedDocs: {
    images: MyDb["image"][];
  },
) => {
  const { dbConnections: bannerImageDbConnections, ...restBannerImage } =
    bannerImage;
  const bannerImageConnectedImage = connectedDocs.images.find(
    (image) => image.id === bannerImageDbConnections.imageId,
  );
  const bannerImageProcessed = !bannerImageConnectedImage
    ? notInUse
    : {
        connectedImage: bannerImageConnectedImage,
        ...restBannerImage,
      };

  return {
    ...restPage,

    bannerImage: bannerImageProcessed,
  };
};

export const processWorkshopsPage = {
  crossProcess,
};
