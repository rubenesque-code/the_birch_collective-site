import { sortByIndex } from "~/helpers/data/process";
import type { MyDb } from "~/types/database";

const landingPage = ({
  connectedDocs,
  landingPage,
}: {
  landingPage: MyDb["pages"]["landing"];
  connectedDocs: {
    programmes: MyDb["programme"][];
    supporters: MyDb["supporter"][];
    partners: MyDb["partner"][];
    images: MyDb["image"][];
  };
}) => {
  const bannerImageConnectedImage = connectedDocs.images.find(
    (image) => image.id === landingPage.bannerImage.dbConnections.imageId,
  );

  const aboutUsBulletsValid = landingPage.aboutUs.entries.filter(
    (bullet) => bullet.text.length,
  );

  const workshopsConnectedImage = connectedDocs.images.find(
    (image) => image.id === landingPage.workshops.image.dbConnections.imageId,
  );

  const connectedProgrammes = landingPage.programmes.entries
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
        connectedImage: connectedDocs.images.find(
          (image) => image.id === entry.image.dbConnections.imageId,
        ),
        position: entry.image.position,
      },
    }))
    .sort(sortByIndex);

  const connectedPartners = landingPage.partners.entries
    .map((entry) =>
      connectedDocs.partners.find(
        (p) => p.id === entry.dbConnections.partnerId,
      ),
    )
    .flatMap((connectedPartner) => (connectedPartner ? [connectedPartner] : []))
    .sort(sortByIndex);

  return {
    id: landingPage.id,

    bannerImage: !bannerImageConnectedImage
      ? null
      : {
          connectedImage: bannerImageConnectedImage,
          ...landingPage.bannerImage,
        },

    orgHeadings: landingPage.orgHeadings,

    aboutUs: !aboutUsBulletsValid.length
      ? null
      : {
          buttonText: landingPage.aboutUs.buttonText,
          heading: landingPage.aboutUs.heading,
          entries: aboutUsBulletsValid,
        },

    workshops: !workshopsConnectedImage
      ? null
      : {
          image: {
            image: workshopsConnectedImage,
            position: landingPage.workshops.image.position,
          },
          ...landingPage.workshops.textOverlay,
        },

    programmes: !connectedProgrammes.length
      ? null
      : {
          buttonText: landingPage.programmes.buttonText,
          heading: landingPage.programmes.heading,
          subheading: landingPage.programmes.subheading,
          entries: connectedProgrammes,
        },

    photoAlbum: !photoAlbumEntries.length
      ? null
      : {
          hading: landingPage.photoAlbum.heading,
          entries: photoAlbumEntries,
        },

    partners: !connectedPartners.length
      ? null
      : {
          heading: landingPage.partners.heading,
          subheading: landingPage.partners.subheading,
          connectedPartners,
        },
  };
};

const crossProcess = {
  landingPage,
};

export default crossProcess;
