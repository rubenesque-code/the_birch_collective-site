/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { findByConnectedImage } from "./_helpers";

import type { MyDb } from "~/types/database";

const selfValidate = ({ name }: MyDb["partner"]) => {
  const hasRequiredFields = name.length;

  return Boolean(hasRequiredFields);
};

const selfValidateMany = (partners: MyDb["partner"][]) =>
  partners.filter(selfValidate);

selfValidate.many = selfValidateMany;

const crossProcess = (
  { image, ...restPartner }: MyDb["partner"],
  connectedDocs: { images: MyDb["image"][] },
) => {
  const connectedImage = findByConnectedImage(image, connectedDocs.images);

  if (!connectedImage) {
    return "requirements not met" as const;
  }

  return {
    ...restPartner,
    connectedImage,
  };
};

const crossProcessMany = (
  partners: MyDb["partner"][],
  connectedDocs: {
    images: MyDb["image"][];
  },
) => {
  const processed = partners
    .map((partner) => crossProcess(partner, connectedDocs))
    .flatMap((partner) =>
      partner !== "requirements not met" ? [partner] : [],
    );

  return processed;
};

export type ProcessedPartners = ReturnType<typeof crossProcessMany>;

crossProcess.many = crossProcessMany;

export const processPartner = {
  selfValidate,
  crossProcess,
};
