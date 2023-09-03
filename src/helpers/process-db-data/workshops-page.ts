import { notInUse } from "./_helpers";

import type { MyDb } from "~/types/database";

const crossProcess = (
  { bannerImage, aboutAmy, ...restPage }: MyDb["pages"]["workshops"],
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

  const aboutAmyImageConnectedImage = connectedDocs.images.find(
    (image) => image.id === aboutAmy.image.dbConnections.imageId,
  );
  const aboutAmyRequirements =
    aboutAmy.text.length || aboutAmy.instaLink.length;
  const aboutAmyProcessed = !aboutAmyRequirements
    ? notInUse
    : {
        followOnInstaText: aboutAmy.followOnInstaText.length
          ? aboutAmy.followOnInstaText
          : notInUse,
        heading: aboutAmy.heading.length ? aboutAmy.heading : notInUse,
        image: !aboutAmyImageConnectedImage
          ? notInUse
          : {
              connectedImage: aboutAmyImageConnectedImage,
              position: aboutAmy.image.position,
            },
        instaLink: !aboutAmy.instaLink.length ? notInUse : aboutAmy.instaLink,
        text: !aboutAmy.text.length ? notInUse : aboutAmy.text,
      };

  return {
    ...restPage,

    bannerImage: bannerImageProcessed,

    aboutAmy: aboutAmyProcessed,
  };
};

export const processWorkshopsPage = {
  crossProcess,
};
