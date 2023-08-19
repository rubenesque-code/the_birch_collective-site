import type { MyDb } from "~/types/database";

export function filterByConnectedImage<
  TDoc extends { image: { dbConnections: { imageId: string | null } } },
>(doc: TDoc, images: MyDb["image"][]) {
  if (!doc.image.dbConnections.imageId) {
    return false;
  }

  return images.some((image) => image.id === doc.image.dbConnections.imageId);
}

export function findByConnectedImage<
  TImage extends { dbConnections: { imageId: string | null } },
>(docImage: TImage, images: MyDb["image"][]) {
  return images.find((image) => image.id === docImage.dbConnections.imageId);
}

export function findByImageId(imageId: string, images: MyDb["image"][]) {
  return images.find((image) => image.id === imageId);
}

export const notInUse = "not in use" as const;
