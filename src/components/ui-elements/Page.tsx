import React from "react";
import Markdown from "markdown-to-jsx";

import { StorageImage } from "../StorageImage";

import type { MyDb } from "~/types/database";

function Page() {
  throw new Error(
    "Page exists for naming purposes only and should not be used as a component",
  );
}

export default Page;

type BannerImage = {
  connectedImage: MyDb["image"];
  position: {
    x: number;
    y: number;
  };
};

const BannerImage = ({ data }: { data: BannerImage }) => (
  <div className="group/bannerImage relative aspect-[16/9] overflow-hidden xl:aspect-[14/3]">
    <StorageImage urls={data.connectedImage.urls} position={data.position} />
  </div>
);

Page.BannerImage = BannerImage;

const Heading = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <h1
    className={`font-display text-5xl font-bold tracking-wider xs:text-7xl md:text-8xl ${
      className || ""
    }`}
  >
    <Markdown>{children}</Markdown>
  </h1>
);

Page.Heading = Heading;

const Subheading = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <div
    className={`mb-xs text-xl font-light uppercase tracking-wide text-display md:text-2xl ${
      className || ""
    }`}
  >
    <Markdown>{children}</Markdown>
  </div>
);

Page.Subheading = Subheading;

const VerticalSpace = ({
  sizing = "default",
  className,
}: {
  className?: string;
  sizing?: "half" | "default" | "double";
}) => (
  <div
    className={`${className || ""} ${
      sizing === "half"
        ? "mt-6 xs:mt-8 lg:mt-12"
        : sizing === "double"
        ? "mt-16 xs:mt-32 lg:mt-48"
        : "mt-12 xs:mt-16 lg:mt-24"
    } `}
  />
);

Page.VerticalSpace = VerticalSpace;

const HorizontalSpace = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="grid place-items-center">
    <div
      className={`w-screen max-w-[1600px] px-4 xs:px-8 sm:px-12 md:px-16 lg:px-24 ${
        className || ""
      }`}
    >
      {children}
    </div>
  </div>
);

Page.HorizontalSpace = HorizontalSpace;

const MainText = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <div
    className={`custom-prose prose mt-sm w-full max-w-full md:columns-2 md:gap-10 ${
      className || ""
    }`}
  >
    <Markdown>{children}</Markdown>
  </div>
);

Page.MainText = MainText;
