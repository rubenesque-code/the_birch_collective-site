import Header from "~/components/sections/header";
import { StorageImage } from "~/components/StorageImage";

import { type StaticData } from "./_static-data";

import type { MyDb } from "~/types/database";

const HomePage = ({ staticData }: StaticData) => {
  return (
    <div>
      <Header
        staticData={{
          header: staticData.header,
          linkLabels: staticData.linkLabels,
          orgDetails: staticData.orgDetails,
          logoImg:
            staticData.images.find(
              (image) =>
                image.id ===
                staticData.orgDetails.logoImage.dbConnections.imageId,
            ) || null,
        }}
      />
      <BannerImage
        data={staticData.page["bannerImage"]}
        image={
          staticData.images.find(
            (image) =>
              image.id === staticData.page.bannerImage.dbConnections.imageId,
          ) || null
        }
      />
    </div>
  );
};

export default HomePage;

const BannerImage = ({
  data,
  image,
}: {
  data: MyDb["pages"]["landing"]["bannerImage"];
  image: MyDb["image"] | null;
}) => {
  if (!image) {
    return null;
  }

  return (
    <div className="group/bannerImage relative aspect-[21/9]">
      <StorageImage urls={image.urls} position={data.position} />
    </div>
  );
};
