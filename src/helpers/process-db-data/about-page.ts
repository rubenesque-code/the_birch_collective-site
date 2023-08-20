/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  filterByConnectedImage,
  findByConnectedImage,
  notInUse,
} from "./_helpers";

import type { MyDb } from "~/types/database";

const crossProcess = (
  { bannerImage, theTeam, ...restPage }: MyDb["pages"]["aboutUs"],
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

  const { members, ...restTheTeam } = theTeam;
  const membersProcessed = members
    .filter((member) => filterByConnectedImage(member, connectedDocs.images))
    .map(({ image, ...restMember }) => {
      const connectedImage = findByConnectedImage(image, connectedDocs.images)!;

      const imageProcessed = {
        connectedImage,
        position: image.position,
      };

      return {
        ...restMember,
        image: imageProcessed,
      };
    });
  const theTeamProcessed = !membersProcessed.length
    ? notInUse
    : {
        ...restTheTeam,
        members: membersProcessed,
      };

  return {
    ...restPage,

    bannerImage: bannerImageProcessed,

    theTeam: theTeamProcessed,
  };
};

export const processAboutPage = {
  crossProcess,
};
