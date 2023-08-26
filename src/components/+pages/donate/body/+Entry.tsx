import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";

import type { StaticData } from "../_static-data";

import { type ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["body"]>;

const Body = ({ heading, image, text }: Data) => (
  <div className="relative">
    <div className="text-center text-4xl">{heading}</div>

    <Ui.Section.VerticalSpace />

    <div className="mt-xl grid grid-cols-2 gap-lg">
      {image === "not in use" ? null : (
        <div className="relative aspect-[1/1]">
          <StorageImage
            urls={image.connectedImage.urls}
            position={image.position}
          />
        </div>
      )}

      <div className="custom-prose prose w-full max-w-full">{text}</div>
    </div>
  </div>
);

export default Body;
