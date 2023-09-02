import { StorageImage } from "../StorageImage";

import { type BannerImage as BannerImageType } from "~/pre-render-helpers/types";

export const BannerImage = ({ data }: { data: BannerImageType }) => (
  <div className="group/bannerImage relative aspect-[16/11] overflow-hidden sm:aspect-[16/9] xl:aspect-[14/3]">
    <StorageImage
      urls={data.connectedImage.urls}
      position={data.position}
      loading="eager"
    />
  </div>
);
