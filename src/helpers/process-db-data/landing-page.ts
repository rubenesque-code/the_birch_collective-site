/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { filterByConnectedImage, findByImageId, notInUse } from "./_helpers";
import { type ProcessedPartners } from "./partner";
import { type ProcessedProgrammes } from "./programme";
import { type ProcessedSupporters } from "./supporter";

import { sortByIndex } from "~/helpers/data/process";
import type { MyDb } from "~/types/database";

const crossProcess = (
  {
    aboutUs,
    bannerImage,
    partners,
    photoAlbum,
    programmes,
    workshops,
    ...restPage
  }: MyDb["pages"]["landing"],
  connectedDocs: {
    images: MyDb["image"][];
    partners: ProcessedPartners;
    programmes: ProcessedProgrammes;
    supporters: ProcessedSupporters;
  },
) => {
  const { entries: aboutUsEntries, ...restAboutUs } = aboutUs;
  const aboutUsEntriesProcessed = aboutUsEntries
    .filter((entry) => entry.text.length)
    .sort(sortByIndex);
  const aboutUsProcessed = !aboutUsEntriesProcessed.length
    ? notInUse
    : {
        ...restAboutUs,
        entries: aboutUsEntriesProcessed,
      };

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

  const { entries: partnerEntries, ...restPartners } = partners;
  const partnerEntriesProcessed = partnerEntries
    .map((entry) =>
      connectedDocs.partners.find(
        (p) => p.id === entry.dbConnections.partnerId,
      ),
    )
    .flatMap((connectedPartner) => (connectedPartner ? [connectedPartner] : []))
    .sort(sortByIndex);
  const partnersProcessed = {
    ...restPartners,
    entries: partnerEntriesProcessed,
  };

  const { entries: programmeEntries, ...restProgrammes } = programmes;
  const programmeEntriesProcessed = programmeEntries
    .map((entry) =>
      connectedDocs.programmes.find(
        (p) => p.id === entry.dbConnections.programmeId,
      ),
    )
    .flatMap((p) => (p ? [p] : []))
    .sort(sortByIndex);
  const programmesProcessed = !programmeEntriesProcessed.length
    ? notInUse
    : {
        entries: programmeEntriesProcessed,
        ...restProgrammes,
      };

  const { entries: photoAlbumEntries, ...restPhotoAlbum } = photoAlbum;
  const photoAlbumEntriesProcessed = photoAlbumEntries
    .filter((entry) => filterByConnectedImage(entry, connectedDocs.images))
    .map(({ image, ...restEntry }) => {
      const { dbConnections, ...restImage } = image;
      const connectedImage = findByImageId(
        dbConnections.imageId,
        connectedDocs.images,
      )!;
      const processedImage = {
        connectedImage,
        ...restImage,
      };
      return {
        ...restEntry,
        image: processedImage,
      };
    })
    .sort(sortByIndex);
  const photoAlbumProcessed = !photoAlbumEntries.length
    ? notInUse
    : {
        ...restPhotoAlbum,
        entries: photoAlbumEntriesProcessed,
      };

  const {
    image: { dbConnections: workshopImageDbConnections, ...restWorkshopsImage },
    ...restWorkshops
  } = workshops;
  const workshopsConnectedImage = connectedDocs.images.find(
    (image) => image.id === workshopImageDbConnections.imageId,
  );
  const workshopsProcessed = !workshopsConnectedImage
    ? notInUse
    : {
        image: {
          connectedImage: workshopsConnectedImage,
          ...restWorkshopsImage,
        },
        ...restWorkshops,
      };

  return {
    ...restPage,

    aboutUs: aboutUsProcessed,

    bannerImage: bannerImageProcessed,

    partners: partnersProcessed,

    programmes: programmesProcessed,

    photoAlbum: photoAlbumProcessed,

    workshops: workshopsProcessed,
  };
};

export const processLandingPage = {
  crossProcess,
};
