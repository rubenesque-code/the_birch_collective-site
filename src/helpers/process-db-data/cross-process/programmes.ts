/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { sortByIndex } from "~/helpers/data/process";
import type { MyDb } from "~/types/database";

function filterByConnectedImage<
  TDoc extends { image: { dbConnections: { imageId: string | null } } },
>(doc: TDoc, images: MyDb["image"][]) {
  if (!doc.image.dbConnections.imageId) {
    return false;
  }

  return images.some((image) => image.id === doc.image.dbConnections.imageId);
}

export const programme = ({
  connectedDocs,
  programme: { bannerImage, info, posters, photoAlbum },
}: {
  programme: MyDb["programme"];
  connectedDocs: {
    images: MyDb["image"][];
  };
}) => {
  const connectedBannerImage = connectedDocs.images.find(
    (image) => image.id === bannerImage.dbConnections.imageId,
  );

  const bannerImageProcessed = {
    connectedImage: connectedBannerImage,
    position: bannerImage.position,
  };

  const infoProcessed = info
    .filter((entry) => entry.text.length || entry.title.length)
    .sort(sortByIndex);

  const postersProcessed = posters
    .filter((poster) => filterByConnectedImage(poster, connectedDocs.images))
    .map(({ image: posterImage, ...restPoster }) => ({
      connectedImage: connectedDocs.images.find(
        (image) => image.id === posterImage.dbConnections.imageId,
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
            connectedImage: connectedDocs.images.find(
              (image) => image.id === entryImage.dbConnections.imageId,
            )!,
            position: entryImage.position,
          },
        }));

  const photoAlbumProcessed =
    !photoAlbum.use || !photoAlbumEntriesProcessed?.length
      ? null
      : {
          heading: photoAlbum.heading,
          entries: photoAlbumEntriesProcessed,
        };

  /*   const connectedSummaryImage = connectedDocs.images.find(
    (image) => image.id === programme.summary.image.dbConnections.imageId,
  ); */

  return {
    image: {
      connectedImage: connectedBannerImage,
    },
  };
};
