// · REQUIRED
// · own-fields: name.length.
// · connected-docs: image.

export type Partner = {
  id: string;
  index: number;
  image: {
    dbConnections: {
      imageId: string | null;
    };
  };
  url: string;
  name: string;
};
