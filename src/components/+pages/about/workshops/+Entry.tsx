import Markdown from "markdown-to-jsx";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";

import type { StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
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
  <div className="absolute bottom-0 right-0 min-w-fit translate-y-xl bg-brandRed p-6 pr-12 text-white md:-bottom-10 md:w-1/3 md:translate-y-0 md:p-12">
    <div className="text-left font-display text-6xl font-bold tracking-wide text-white">
      <Markdown>{heading}</Markdown>
    </div>
    <div className="mt-3 hidden w-[300px] text-xl md:block ">
      <Markdown>{body}</Markdown>
    </div>
    <div className="absolute bottom-4 right-1 md:right-5">
      <Icon.CaretRight weight="bold" size={40} />
    </div>
  </div>
);
