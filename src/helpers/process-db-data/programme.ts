/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { sortByIndex } from "../data/process";
import { filterByConnectedImage, findByConnectedImage } from "./_helpers";

import type { MyDb } from "~/types/database";

const selfValidate = ({
  mainText,
  summary,
  title,
  bannerImage,
}: MyDb["programme"]) => {
  const hasRequiredFields =
    mainText.length &&
    (summary.image.dbConnections.imageId ||
      bannerImage.dbConnections.imageId) &&
    title.length;

  return Boolean(hasRequiredFields);
};

const selfValidateMany = (programmes: MyDb["programme"][]) =>
  programmes.filter(selfValidate);

selfValidate.many = selfValidateMany;

const crossProcess = (
  {
    bannerImage,
    summary,
    info,
    usePosters,
    posters,
    photoAlbum,
    sections,
    ...restProgramme
  }: MyDb["programme"],
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

  const bannerImageProcessed = {
    connectedImage: connectedBannerImage,
    position: bannerImage.position,
  };

  const infoProcessed = info
    .filter((entry) => entry.text.length || entry.title.length)
    .sort(sortByIndex);

  const postersProcessed = !usePosters
    ? ("not in use" as const)
    : posters
        .filter((poster) =>
          filterByConnectedImage(poster, connectedDocs.images),
        )
        .map(({ image: posterImage, ...restPoster }) => ({
          connectedImage: findByConnectedImage(
            posterImage,
            connectedDocs.images,
          )!,
          ...restPoster,
        }))
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
            position: entryImage.position,
          },
        }))
        .sort(sortByIndex);

  const photoAlbumProcessed =
    !photoAlbum.use || !photoAlbumEntriesProcessed?.length
      ? ("not in use" as const)
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
    bullets: summary.bullets
      .filter((bullet) => bullet.text.length)
      .sort(sortByIndex),
    image: summaryImageProcessed,
    mainText: summary.mainText,
  };

  return {
    ...restProgramme,
    bannerImage: bannerImageProcessed,
    info: infoProcessed,
    posters: postersProcessed,
    photoAlbum: photoAlbumProcessed,
    sections: sectionsProcessed,
    summary: summaryProcessed,
  };
};

const crossProcessMany = (
  programmes: MyDb["programme"][],
  connectedDocs: {
    images: MyDb["image"][];
  },
) => {
  const processed = programmes
    .map((programme) => crossProcess(programme, connectedDocs))
    .flatMap((programme) =>
      programme !== "requirements not met" ? [programme] : [],
    );

  return processed;
};

export type ProcessedProgrammes = ReturnType<typeof crossProcessMany>;

crossProcess.many = crossProcessMany;

export const processProgramme = {
  selfValidate,
  crossProcess,
};
