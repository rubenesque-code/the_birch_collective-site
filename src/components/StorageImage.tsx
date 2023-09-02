import React from "react";

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
};

export const StorageImage = ({
  urls,
  position = { x: 50, y: 50 },
  objectFit = "cover",
  isCircle = false,
  onImgLoaded,
  loading = "lazy",
}: Props) => {
  // const [blurIsLoaded, setBlurIsLoaded] = React.useState(false);
  // const [imgIsLoaded, setImgIsLoaded] = React.useState(false);

  return (
    <NextImage
      alt=""
      fill
      src={urls.large}
      blurDataURL={urls.blur}
      placeholder="blur"
      className={`${isCircle ? "rounded-full" : ""}`}
      loading={loading}
      style={{
        objectFit,
        objectPosition: `${position.x}% ${position.y}%`,
      }}
      onLoadingComplete={() => {
        // setImgIsLoaded(true);

        if (onImgLoaded) {
          onImgLoaded();
        }
      }}
    />
  );
};
