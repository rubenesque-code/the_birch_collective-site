import type { MyDb } from "~/types/database";

const selfValidate = ({ description, title }: MyDb["career"]) => {
  const hasRequiredFields = description.length && title.length;

  return Boolean(hasRequiredFields);
};

const selfValidateMany = (careers: MyDb["career"][]) =>
  careers.filter(selfValidate);

selfValidate.many = selfValidateMany;

export type ProcessedCareers = ReturnType<typeof selfValidateMany>;

export const processCareer = {
  selfValidate,
};
