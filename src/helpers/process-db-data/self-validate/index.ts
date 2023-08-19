import { landingPage } from "./landing-page";

import type { MyDb } from "~/types/database";

// · self validation is to remove docs without required fields that don't depend on connected docs

const participantTestimonial = ({
  endorserName,
  text,
  image,
}: MyDb["participant-testimonial"]) => {
  const hasRequiredFields =
    endorserName.length && text.length && image.dbConnect.imageId;

  return Boolean(hasRequiredFields);
};

const partner = ({ image, name }: MyDb["partner"]) => {
  const hasRequiredFields = image.dbConnections.imageId && name.length;

  return Boolean(hasRequiredFields);
};

const programme = ({
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

const supporter = ({ image, name }: MyDb["supporter"]) => {
  const hasRequiredFields = image.dbConnections.imageId && name.length;

  return Boolean(hasRequiredFields);
};

const selfValidate = {
  participantTestimonial,
  partner,
  programme,
  supporter,
  landingPage,
};

export default selfValidate;
