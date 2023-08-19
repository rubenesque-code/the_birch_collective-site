/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { findByConnectedImage } from "./_helpers";

import type { MyDb } from "~/types/database";

const selfValidate = ({ name }: MyDb["supporter"]) => {
  const hasRequiredFields = name.length;

  return Boolean(hasRequiredFields);
};

const selfValidateMany = (supporters: MyDb["supporter"][]) =>
  supporters.filter(selfValidate);

selfValidate.many = selfValidateMany;

const crossProcess = (
  { image, ...restSupporter }: MyDb["supporter"],
  connectedDocs: { images: MyDb["image"][] },
) => {
  const connectedImage = findByConnectedImage(image, connectedDocs.images);

  if (!connectedImage) {
    return "requirements not met" as const;
  }

  return {
    ...restSupporter,
    connectedImage,
  };
};

const crossProcessMany = (
  supporters: MyDb["supporter"][],
  connectedDocs: {
    images: MyDb["image"][];
  },
) => {
  const processed = supporters
    .map((supporter) => crossProcess(supporter, connectedDocs))
    .flatMap((supporter) =>
      supporter !== "requirements not met" ? [supporter] : [],
    );

  return processed;
};

export type ProcessedSupporters = ReturnType<typeof crossProcessMany>;

crossProcess.many = crossProcessMany;

export const processSupporter = {
  selfValidate,
  crossProcess,
};
