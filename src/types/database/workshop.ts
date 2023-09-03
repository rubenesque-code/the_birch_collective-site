import { type RichSection } from "./_common";

export type Workshop = {
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

    use: boolean;
  };

  info: { id: string; index: number; title: string; text: string }[];

  mainText: string;

  photoAlbum: {
    use: boolean;

    entries: {
      id: string;
      index: number;
      image: {
        dbConnections: {
          imageId: string | null;
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

  summary: {
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

  subtitle: string;

  tickets: {
    heading: string;
    text: string;
    signUpButton: {
      link: string;
      text: string;
    };
  };

  title: string;

  type: "paid" | "free";
};
