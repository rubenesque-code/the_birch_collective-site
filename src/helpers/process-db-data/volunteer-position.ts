import type { MyDb } from "~/types/database";

const selfValidate = ({ name, text }: MyDb["volunteer-position"]) => {
  const hasRequiredFields = name.length && text.length;

  return Boolean(hasRequiredFields);
};

const selfValidateMany = (partners: MyDb["volunteer-position"][]) =>
  partners.filter(selfValidate);

selfValidate.many = selfValidateMany;

export type ProcessedVolunteerPositions = ReturnType<typeof selfValidateMany>;

export const processVolunteerPosition = {
  selfValidate,
};
