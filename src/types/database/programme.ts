import type { RichSection } from "./_common";

export type Programme = {
  id: string;

  index: number;

  bannerImage: {
    dbConnections: {
      imageId: string | null;
    };
    position: {
      x: number;
      y: number;
    };
  };

  info: { id: string; index: number; title: string; text: string }[];

  mainText: string;

  usePosters: boolean;

  posters: {
    id: string;
    index: number;
    image: {
      dbConnections: {
        imageId: string | null;
      };
    };
  }[];

  photoAlbum: {
    use: boolean;

    entries: {
      id: string;
      index: number;
      image: {
        dbConnections: {
          imageId: string | null;
        };
        position: {
          x: number;
          y: number;
        };
      };
    }[];

    heading: string;
  };

  sections: RichSection[];

  signUp: {
    heading: string;

    text: string;

    buttonText: string;

    notifyEmails: string[];
  };

  subtitle: string;

  summary: {
    bullets: { id: string; index: number; text: string }[];

    image: {
      dbConnections: {
        imageId: string | null;
      };

      position: {
        x: number;
        y: number;
      };
    };

    mainText: string;
  };

  title: string;
};
