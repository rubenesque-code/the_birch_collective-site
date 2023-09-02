import { type MyDb } from "~/types/database";

export type CommonData = {
  footer: MyDb["singles"]["footer"];
  header: MyDb["singles"]["header"];
  linkLabels: MyDb["singles"]["linkLabels"];
  orgDetails: MyDb["singles"]["orgDetails"];
  logoImage: MyDb["image"] | null;
};

export type BannerImage = {
  position: {
    x: number;
    y: number;
  };
  infoPopover?: {
    text: string;
  };
  connectedImage: MyDb["image"];
};
