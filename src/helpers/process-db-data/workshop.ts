/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { sortByIndex } from "../data/process";
import {
  filterByConnectedImage,
  findByConnectedImage,
  notInUse,
} from "./_helpers";

import type { MyDb } from "~/types/database";

const selfValidate = ({
  mainText,
  summary,
  title,
  bannerImage,
}: MyDb["workshop"]) => {
  const hasRequiredFields =
    mainText.length &&
    (summary.image.dbConnections.imageId ||
      bannerImage.dbConnections.imageId) &&
    title.length;

  return Boolean(hasRequiredFields);
};

const selfValidateMany = (workshops: MyDb["workshop"][]) =>
  workshops.filter(selfValidate);

selfValidate.many = selfValidateMany;

const crossProcess = (
  {
    bannerImage,
    summary,
    info,
    photoAlbum,
    sections,
    ...restWorkshop
  }: MyDb["workshop"],
  connectedDocs: { images: MyDb["image"][] },
) => {
  const connectedSummaryImage = connectedDocs.images.find(
    (image) => image.id === summary.image.dbConnections.imageId,
  );

  const connectedBannerImage = connectedDocs.images.find(
    (image) => image.id === bannerImage.dbConnections.imageId,
  );

  const summaryImageProcessed =
    !connectedSummaryImage && !connectedBannerImage
      ? null
      : {
          connectedImage:
            connectedSummaryImage || (connectedBannerImage as MyDb["image"]),
          position: connectedSummaryImage
            ? summary.image.position
            : bannerImage.position,
        };

  if (!summaryImageProcessed) {
    return "requirements not met" as const;
  }

  const bannerImageProcessed = !connectedBannerImage
    ? notInUse
    : {
        connectedImage: connectedBannerImage,
        position: bannerImage.position,
      };

  const infoProcessed = info
    .filter((entry) => entry.text.length || entry.title.length)
    .sort(sortByIndex);

  const photoAlbumEntriesProcessed = !photoAlbum.use
    ? null
    : photoAlbum.entries
        .filter((entry) => filterByConnectedImage(entry, connectedDocs.images))
        .map(({ image: entryImage, ...restEntry }) => ({
          ...restEntry,
          image: {
            connectedImage: findByConnectedImage(
              entryImage,
              connectedDocs.images,
            )!,
          },
        }))
        .sort(sortByIndex);

  const photoAlbumProcessed =
    !photoAlbum.use || !photoAlbumEntriesProcessed?.length
      ? notInUse
      : {
          heading: photoAlbum.heading,
          entries: photoAlbumEntriesProcessed,
        };

  const sectionsProcessed = sections
    .map(({ bullets, ...restSection }) => ({
      ...restSection,
      bullets: {
        icon: bullets.icon,
        type: bullets.type,
        entries: bullets.entries
          .filter((bullet) => bullet.text.length || bullet.title?.length)
          .sort(sortByIndex),
      },
    }))
    .filter((section) => section.bullets.entries.length && section.title.length)
    .sort(sortByIndex);

  const summaryProcessed = {
    image: summaryImageProcessed,
    mainText: summary.mainText,
  };

  return {
    ...restWorkshop,

    bannerImage: bannerImageProcessed,

    info: infoProcessed,

    photoAlbum: photoAlbumProcessed,

    sections: sectionsProcessed,

    summary: summaryProcessed,
  };
};

const crossProcessMany = (
  workshops: MyDb["workshop"][],
  connectedDocs: {
    images: MyDb["image"][];
  },
) => {
  const processed = workshops
    .map((workshop) => crossProcess(workshop, connectedDocs))
    .flatMap((workshop) =>
      workshop !== "requirements not met" ? [workshop] : [],
    );

  return processed;
};

export type ProcessedWorkshops = ReturnType<typeof crossProcessMany>;

crossProcess.many = crossProcessMany;

export const processWorkshop = {
  selfValidate,
  crossProcess,
};
