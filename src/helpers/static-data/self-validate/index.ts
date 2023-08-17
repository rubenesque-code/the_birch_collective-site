import type { MyDb } from "~/types/database";

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
  signUp,
  summary,
  title,
  bannerImage,
}: MyDb["programme"]) => {
  const hasRequiredFields =
    mainText.length &&
    signUp.heading.length &&
    signUp.buttonText.length &&
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
};

export default selfValidate;
