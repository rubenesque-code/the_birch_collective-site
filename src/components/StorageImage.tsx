import { useState } from "react";
import NextImage from "next/image";

import { storage_urls } from "~/firebase/static-data/urls";
import { isDevMode } from "~/static-data/process";
import { StorageImage } from "~/types/site";

// □ image as StorageImage - don't need image to have id

const StorageImage = ({
  // objectFit = "cover",
  // objectPosition,
  urlEndpoint,
  // layout = "fill",
  height,
  width,
  sizes,
  priority = false,
}: {
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  urlEndpoint: string | undefined;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}) => {
  const [isLoading, setLoading] = useState(true);

  const dummySrc =
    "https://images.unsplash.com/photo-1646886273817-23cec5265907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60";
  const src = isDevMode
    ? dummySrc
    : urlEndpoint
    ? storage_urls.image_base + urlEndpoint
    : "";

  return (
    <NextImage
      alt=""
      src={src}
      fill
      // layout={layout}
      // objectFit={objectFit}
      className={isLoading ? "bg-brandLightBrown" : ""}
      // objectPosition={objectPosition}
      onLoadingComplete={() => setLoading(false)}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
    />
  );
};

export default StorageImage;
