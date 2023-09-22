import React from "react";

import { Icon } from "./icons";

import { NextImage } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

type Props = { urls: MyDb["image"]["urls"] } & {
  position?: {
    x: number;
    y: number;
  };
  objectFit?: "cover" | "contain";
  isCircle?: boolean;
  onImgLoaded?: () => void;
  loading?: "lazy" | "eager";
  sizes?: string;
};

export const StorageImage = ({
  urls,
  position = { x: 50, y: 50 },
  objectFit = "cover",
  isCircle = false,
  onImgLoaded,
  loading = "lazy",
  sizes,
}: Props) => {
  // const [blurIsLoaded, setBlurIsLoaded] = React.useState(false);
  const [imgIsLoaded, setImgIsLoaded] = React.useState(false);

  return (
    <div
      className={`relative h-full w-full ${
        imgIsLoaded ? "bg-transparent" : "bg-transparent"
      }`}
    >
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-75 ease-in-out ${
          imgIsLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <Icon.ImageLoading />
      </div>

      <NextImage
        alt=""
        fill
        src={urls.large}
        blurDataURL={urls.blur}
        placeholder="blur"
        className={`transition-opacity duration-100 ease-in-out ${
          isCircle ? "rounded-full" : ""
        } ${imgIsLoaded ? "opacity-100" : "opacity-0"}`}
        loading={loading}
        style={{
          objectFit,
          objectPosition: `${position.x}% ${position.y}%`,
        }}
        onLoad={() => {
          setImgIsLoaded(true);

          if (onImgLoaded) {
            onImgLoaded();
          }
        }}
        sizes={sizes}
      />
    </div>
  );
};
