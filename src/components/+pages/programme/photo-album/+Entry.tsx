import "swiper/css";

import type { StaticData } from "../_static-data";
import Slides from "./Slides";

import { type ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["photoAlbum"]>;

const PhotoAlbum = ({ entries, heading }: Data) => (
  <div className="group/photo-album relative grid w-full place-items-center">
    <div className="w-full sm:w-3/4">
      <div className="mb-sm font-display text-2xl text-brandBrown">
        {heading}
      </div>
      <div className="relative aspect-[16/9] overflow-visible">
        <Slides entries={entries} />
      </div>
    </div>
  </div>
);

export default PhotoAlbum;
