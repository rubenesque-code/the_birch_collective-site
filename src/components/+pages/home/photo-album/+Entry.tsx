import { Icon } from "~/components/icons";

import { type StaticData } from "../_static-data";
import Slides from "./slides/+Entry";

import { strWithFallback } from "~/helpers/utilities";
import type { ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["photoAlbum"]>;

const PhotoAlbum = ({ data: { entries, heading } }: { data: Data }) => (
  <div className="mt-md flex justify-end">
    <div className="w-full sm:w-3/4">
      <div className="flex items-center justify-end gap-xs text-sm text-gray-500 sm:text-base">
        {strWithFallback(heading, "Photos from our events!")}
        <Icon.ArrowRight />
      </div>
      <div className="relative aspect-[16/9] w-full overflow-visible">
        <Slides data={entries} />
      </div>
    </div>
  </div>
);

export default PhotoAlbum;
