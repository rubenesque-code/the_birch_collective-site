import { type ProcessedParticipantTestimonials } from "./participant-testimonial";
import { type ProcessedPartners } from "./partner";
import { type ProcessedProgrammes } from "./programme";
import { type ProcessedSupporters } from "./supporter";

import { sortByIndex } from "~/helpers/data/process";
import type { MyDb } from "~/types/database";

const crossProcess = (
  {
    bannerImage,
    workshops,
    programmes,
    photoAlbum,
    partners,
    aboutUs,
    orgHeadings,
    ...restPage
  }: MyDb["pages"]["landing"],
  connectedDocs: {
    images: MyDb["image"][];
    partners: ProcessedPartners;
    programmes: ProcessedProgrammes;
    supporters: ProcessedSupporters;
    participantTestimonials: ProcessedParticipantTestimonials;
  },
) => {
  const bannerImageConnectedImage =
    connectedDocs.images.find(
      (image) => image.id === bannerImage.dbConnections.imageId,
    ) || null;

  const workshopsConnectedImage =
    connectedDocs.images.find(
      (image) => image.id === workshops.image.dbConnections.imageId,
    ) || null;

  const programmeEntries = programmes.entries
    .map((entry) =>
      connectedDocs.programmes.find(
        (p) => p.id === entry.dbConnections.programmeId,
      ),
    )
    .flatMap((p) => (p ? [p] : []))
    .sort(sortByIndex);

  const photoAlbumEntries = photoAlbum.entries
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

  const partnerEntries = partners.entries
    .map((entry) =>
      connectedDocs.partners.find(
        (p) => p.id === entry.dbConnections.partnerId,
      ),
    )
    .flatMap((connectedPartner) => (connectedPartner ? [connectedPartner] : []))
    .sort(sortByIndex);

  const aboutUsEntries = aboutUs.entries
    .filter((entry) => entry.text.length)
    .sort(sortByIndex);

  return {
    ...restPage,

    bannerImage: !bannerImageConnectedImage
      ? null
      : {
          connectedImage: bannerImageConnectedImage,
          ...bannerImage,
        },

    orgHeadings: orgHeadings,

    aboutUs: !aboutUs.entries.length
      ? null
      : {
          buttonText: aboutUs.buttonText,
          heading: aboutUs.heading,
          entries: aboutUsEntries,
        },

    workshops: !workshopsConnectedImage
      ? null
      : {
          image: {
            connectedImage: workshopsConnectedImage,
            position: workshops.image.position,
          },
          ...workshops.textOverlay,
        },

    programmes: !programmeEntries.length
      ? null
      : {
          buttonText: programmes.buttonText,
          heading: programmes.heading,
          subheading: programmes.subheading,
          entries: programmeEntries,
        },

    photoAlbum: !photoAlbumEntries.length
      ? null
      : {
          hading: photoAlbum.heading,
          entries: photoAlbumEntries,
        },

    partners: !partnerEntries.length
      ? null
      : {
          heading: partners.heading,
          subheading: partners.subheading,
          entries: partnerEntries,
        },
  };
};

export const processLandingPage = {
  crossProcess,
};
