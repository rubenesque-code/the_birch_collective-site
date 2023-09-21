import { notInUse } from "./_helpers";

import type { MyDb } from "~/types/database";

const crossProcess = (
  { bannerImage, body, ...restPage }: MyDb["pages"]["donate-success"],
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

  const { image: bodyImage, ...restBody } = body;
  const connectedBodyImage = connectedDocs.images.find(
    (image) => image.id === bodyImage.dbConnections.imageId,
  );
  const bodyImageProcessed = !connectedBodyImage
    ? notInUse
    : {
        connectedImage: connectedBodyImage,
        position: bodyImage.position,
      };
  const bodyProcessed = {
    ...restBody,
    image: bodyImageProcessed,
  };

  return {
    ...restPage,

    bannerImage: bannerImageProcessed,

    body: bodyProcessed,
  };
};

export const processDonateSuccessPage = {
  crossProcess,
};
