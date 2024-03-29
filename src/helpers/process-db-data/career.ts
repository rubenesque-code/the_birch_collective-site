import { sortByIndex } from "../data/process";

import type { MyDb } from "~/types/database";

const selfValidate = ({ description, title }: MyDb["career"]) => {
  const hasRequiredFields = description.length && title.length;

  return Boolean(hasRequiredFields);
};

const selfValidateMany = (careers: MyDb["career"][]) =>
  careers.filter(selfValidate);

selfValidate.many = selfValidateMany;

const process = ({ docLinkButtons, ...restTestimonial }: MyDb["career"]) => {
  const docLinkButtonsProcessed = docLinkButtons
    .filter((button) => button.link.length && button.text.length)
    .sort(sortByIndex);

  return {
    ...restTestimonial,
    docLinkButtons: docLinkButtonsProcessed,
  };
};

const processMany = (careers: MyDb["career"][]) => {
  const processed = careers.map((career) => process(career));

  return processed;
};

process.many = processMany;

export type ProcessedCareers = ReturnType<typeof selfValidateMany>;

export const processCareer = {
  selfValidate,
  process,
};
