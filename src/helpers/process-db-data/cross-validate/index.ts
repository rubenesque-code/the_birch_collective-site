import type { MyDb } from "~/types/database";

// · cross validation is to remove docs without required fields that depend on connected docs

const participantTestimonial = ({
  partcipantTestimonial,
  connectedDocs,
}: {
  partcipantTestimonial: MyDb["participant-testimonial"];
  connectedDocs: { images: MyDb["image"][] };
}) => {
  const hasValidImage = connectedDocs.images.find(
    (image) => image.id === partcipantTestimonial.image.dbConnect.imageId,
  );

  const hasRequiredConnectedDocs = Boolean(hasValidImage);

  return hasRequiredConnectedDocs;
};

const partner = ({
  partner,
  connectedDocs,
}: {
  partner: MyDb["partner"];
  connectedDocs: { images: MyDb["image"][] };
}) => {
  const hasValidImage = connectedDocs.images.find(
    (image) => image.id === partner.image.dbConnections.imageId,
  );

  const hasRequiredConnectedDocs = Boolean(hasValidImage);

  return hasRequiredConnectedDocs;
};

const programme = ({
  programme,
  connectedDocs,
}: {
  programme: MyDb["programme"];
  connectedDocs: { images: MyDb["image"][] };
}) => {
  const validSummaryImage = connectedDocs.images.find(
    (image) => image.id === programme.summary.image.dbConnections.imageId,
  );

  const validBannerImage = validSummaryImage
    ? null
    : connectedDocs.images.find(
        (image) => image.id === programme.bannerImage.dbConnections.imageId,
      );

  const hasValidSummaryImage = validSummaryImage || validBannerImage;

  const hasRequiredConnectedDocs = Boolean(hasValidSummaryImage);

  return hasRequiredConnectedDocs;
};

const supporter = ({
  supporter,
  connectedDocs,
}: {
  supporter: MyDb["supporter"];
  connectedDocs: { images: MyDb["image"][] };
}) => {
  const hasValidImage = connectedDocs.images.find(
    (image) => image.id === supporter.image.dbConnections.imageId,
  );

  const hasRequiredConnectedDocs = Boolean(hasValidImage);

  return hasRequiredConnectedDocs;
};

const crossValidate = {
  partner,
  programme,
  supporter,
  participantTestimonial,
};

export default crossValidate;
