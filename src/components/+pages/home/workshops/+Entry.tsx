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
  // · mb-xl to account for the text-overlay which is translated by y-xl
  <div className="mb-xl flex justify-end">
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
  <Link href={route.workshops}>
    <div className="absolute bottom-0 right-0 w-4/5 translate-y-xl bg-brandBrown/80 p-sm text-white sm:p-6 md:-bottom-10 md:w-1/3 md:translate-y-0 md:p-12 md:pr-12">
      <div className="text-right font-display text-4xl font-bold tracking-wide xs:text-5xl md:text-6xl ">
        <Markdown>{heading}</Markdown>
      </div>
      <div className="mt-3 text-right sm:text-lg md:block md:w-[300px] md:text-xl">
        <Markdown>{body}</Markdown>
      </div>
      <div className="absolute bottom-4 right-1 hidden text-xl md:right-5 md:inline-block">
        <Icon.CaretRight weight="bold" />
      </div>
    </div>
  </Link>
);

/* const TextOverlay = ({ body, heading }: { heading: string; body: string }) => (
  <Link href={route.workshops}>
    <div className="absolute bottom-0 right-0 w-4/5 translate-y-xl bg-brandBrown/80 p-sm text-white sm:p-6 md:-bottom-10 md:w-1/3 md:translate-y-0 md:p-12 md:pr-12">
      <div className="text-right font-display text-4xl font-bold tracking-wide xs:text-5xl md:text-6xl ">
        <Markdown>{heading}</Markdown>
      </div>
      <div className="mt-3 text-right sm:text-lg md:block md:w-[300px] md:text-xl">
        <Markdown>{body}</Markdown>
      </div>
      <div className="absolute bottom-4 right-1 hidden text-xl md:right-5 md:inline-block">
        <Icon.CaretRight weight="bold" />
      </div>
    </div>
  </Link>
);
 */
