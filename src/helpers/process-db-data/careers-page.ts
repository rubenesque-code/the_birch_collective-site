/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { sortByIndex } from "../data/process";
import { notInUse } from "./_helpers";
import { type ProcessedCareers } from "./career";

import type { MyDb } from "~/types/database";

const crossProcess = (
  { bannerImage, careers, ...restPage }: MyDb["pages"]["careers"],
  connectedDocs: {
    images: MyDb["image"][];
    careers: ProcessedCareers;
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

  const { entries, ...restCareers } = careers;
  const entriesProcessed = entries
    .filter((entry) =>
      connectedDocs.careers.some(
        (career) => career.id === entry.dbConnections.careerId,
      ),
    )
    .map(
      (entry) =>
        connectedDocs.careers.find(
          (career) => career.id === entry.dbConnections.careerId,
        )!,
    )
    .sort(sortByIndex);
  const careersProcessed = !entriesProcessed.length
    ? notInUse
    : {
        ...restCareers,
        entries: entriesProcessed,
      };

  return {
    ...restPage,

    bannerImage: bannerImageProcessed,

    careers: careersProcessed,
  };
};

export const processCareersPage = {
  crossProcess,
};
