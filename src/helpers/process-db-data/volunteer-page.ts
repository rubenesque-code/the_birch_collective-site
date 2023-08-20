import { sortByIndex } from "../data/process";
import { notInUse } from "./_helpers";

import type { MyDb } from "~/types/database";

const crossProcess = (
  {
    bannerImage,
    opportunities,
    ...restPage
  }: MyDb["pages"]["volunteer-positions"],
  connectedDocs: {
    images: MyDb["image"][];
    positions: MyDb["volunteer-position"][];
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

  const { entries, ...restOpportunities } = opportunities;
  const entriesProcessed = entries
    .sort(sortByIndex)
    .filter((entry) =>
      connectedDocs.positions.some(
        (position) => position.id === entry.dbConnections.volunteerPositionId,
      ),
    )
    .map(
      (entry) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        connectedDocs.positions.find(
          (position) => position.id === entry.dbConnections.volunteerPositionId,
        )!,
    );
  const opportunitiesProcessed = {
    ...restOpportunities,
    entries: entriesProcessed,
  };

  return {
    ...restPage,

    bannerImage: bannerImageProcessed,

    opportunities: opportunitiesProcessed,
  };
};

export const processVolunteerPage = {
  crossProcess,
};
