import Link from "next/link";
import Markdown from "markdown-to-jsx";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";

import type { StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
import { route } from "~/static-data/routes";
import { type ExcludeNotInUse } from "~/types/database/_helpers";

const Workshops = ({
  data: { image, textOverlay },
}: {
  data: ExcludeNotInUse<StaticData["page"]["workshops"]>;
}) => (
  <div className="flex justify-end">
    <div className="w-11/12">
      <div className="group/workshops-image relative aspect-[8/5]">
        <StorageImage
          urls={image.connectedImage.urls}
          position={image.position}
        />
        <TextOverlay
          heading={strWithFallback(textOverlay.heading, "Workshops")}
          body={strWithFallback(
            textOverlay.body,
            "Take a look at our wonderful workshops. Profits go to helping our young people for the rest of our programmes.",
          )}
        />
      </div>
    </div>
  </div>
);

export default Workshops;

const TextOverlay = ({ body, heading }: { heading: string; body: string }) => (
  <Link
    href={route.workshops}
    as="div"
    className="absolute bottom-0 right-0 flex w-[240px] flex-col bg-brandBrown/80 p-sm text-white sm:w-[360px] sm:p-6 md:w-1/3 md:p-12 md:pr-12"
  >
    <div className="font-display text-3xl font-bold tracking-wide xs:text-3xl sm:text-4xl md:text-6xl">
      <Markdown>{heading}</Markdown>
    </div>
    <div className="custom-prose prose mt-xxs text-sm text-white sm:mt-3 sm:text-lg md:block md:text-xl">
      <Markdown>{body}</Markdown>
    </div>
    <div className="absolute bottom-sm right-xs text-2xl sm:bottom-xl sm:right-sm sm:text-4xl">
      <Icon.CaretRight weight="bold" />
    </div>
  </Link>
);
