import type { partner } from "./partners";

import { sortByIndex } from "~/helpers/data/process";
import type { MyDb } from "~/types/database";

export const landingPage = ({
  connectedDocs,
  landingPage,
}: {
  landingPage: MyDb["pages"]["landing"];
  connectedDocs: {
    programmes: MyDb["programme"][];
    supporters: MyDb["supporter"][];
    partners: ReturnType<typeof partner>[];
    images: MyDb["image"][];
  };
}) => {
  const bannerImageConnectedImage =
    connectedDocs.images.find(
      (image) => image.id === landingPage.bannerImage.dbConnections.imageId,
    ) || null;

  const workshopsConnectedImage =
    connectedDocs.images.find(
      (image) => image.id === landingPage.workshops.image.dbConnections.imageId,
    ) || null;

  const programmeEntries = landingPage.programmes.entries
    .map((entry) =>
      connectedDocs.programmes.find(
        (p) => p.id === entry.dbConnections.programmeId,
      ),
    )
    .flatMap((p) => (p ? [p] : []))
    .sort(sortByIndex);

  const photoAlbumEntries = landingPage.photoAlbum.entries
    .filter((entry) =>
      connectedDocs.images.find(
        (image) => image.id === entry.image.dbConnections.imageId,
      ),
    )
    .map((entry) => ({
      ...entry,
      image: {
        connectedImage:
          connectedDocs.images.find(
            (image) => image.id === entry.image.dbConnections.imageId,
          ) || null,
        position: entry.image.position,
      },
    }))
    .sort(sortByIndex);

  const partnerEntries = landingPage.partners.entries
    .map((entry) =>
      connectedDocs.partners.find(
        (p) => p.id === entry.dbConnections.partnerId,
      ),
    )
    .flatMap((connectedPartner) => (connectedPartner ? [connectedPartner] : []))
    .sort(sortByIndex);

  const aboutUsEntries = landingPage.aboutUs.entries.sort(sortByIndex);

  return {
    id: landingPage.id,

    bannerImage: !bannerImageConnectedImage
      ? null
      : {
          connectedImage: bannerImageConnectedImage,
          ...landingPage.bannerImage,
        },

    orgHeadings: landingPage.orgHeadings,

    aboutUs: !landingPage.aboutUs.entries.length
      ? null
      : {
          buttonText: landingPage.aboutUs.buttonText,
          heading: landingPage.aboutUs.heading,
          entries: aboutUsEntries,
        },

    workshops: !workshopsConnectedImage
      ? null
      : {
          image: {
            connectedImage: workshopsConnectedImage,
            position: landingPage.workshops.image.position,
          },
          ...landingPage.workshops.textOverlay,
        },

    programmes: !programmeEntries.length
      ? null
      : {
          buttonText: landingPage.programmes.buttonText,
          heading: landingPage.programmes.heading,
          subheading: landingPage.programmes.subheading,
          entries: programmeEntries,
        },

    photoAlbum: !photoAlbumEntries.length
      ? null
      : {
          hading: landingPage.photoAlbum.heading,
          entries: photoAlbumEntries,
        },

    partners: !partnerEntries.length
      ? null
      : {
          heading: landingPage.partners.heading,
          subheading: landingPage.partners.subheading,
          entries: partnerEntries,
        },
  };
};
