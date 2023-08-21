import type { GetStaticProps } from "next";

import processDbData from "~/helpers/process-db-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

export type StaticData = {
  footer: MyDb["singles"]["footer"];
  header: MyDb["singles"]["header"];
  linkLabels: MyDb["singles"]["linkLabels"];
  orgDetails: MyDb["singles"]["orgDetails"];
  logoImage: MyDb["image"] | null;

  page: ReturnType<(typeof processDbData)["volunteerPage"]["crossProcess"]>;
};

export const getStaticProps: GetStaticProps<StaticData> = async () => {
  const footer = await myDb.footer.fetch();
  const header = await myDb.header.fetch();
  const linkLabels = await myDb.linkLabels.fetch();
  const orgDetails = await myDb.orgDetails.fetch();

  const page = await myDb.pages["volunteer-positions"].fetch();

  const connectedDocIds = {
    positions: page.opportunities.entries.map(
      (entry) => entry.dbConnections.volunteerPositionId,
    ),
  };
  console.log("connectedDocIds:", connectedDocIds);

  const connectedDocsFetched = {
    positions: await myDb["volunteer-positions"].fetchMany(
      connectedDocIds.positions,
    ),
  };
  console.log("connectedDocsFetched:", connectedDocsFetched);

  const connectedDocsSelfValidated = {
    positions: processDbData.volunteerPosition.selfValidate.many(
      connectedDocsFetched.positions,
    ),
  };
  console.log("connectedDocsSelfValidated:", connectedDocsSelfValidated);

  const connectedImageIds = [
    orgDetails.logoImage.dbConnections.imageId,

    page.bannerImage.dbConnections.imageId,
  ].flatMap((i) => (i ? [i] : []));

  const connectedImages = await myDb.image.fetchMany(connectedImageIds);

  const pageCrossProcessed = processDbData.volunteerPage.crossProcess(page, {
    images: connectedImages,
    positions: connectedDocsSelfValidated.positions,
  });

  const logoImage =
    connectedImages.find(
      (image) => image.id === orgDetails.logoImage.dbConnections.imageId,
    ) || null;

  const data: StaticData = {
    footer,
    header,
    linkLabels,
    orgDetails,
    logoImage,

    page: pageCrossProcessed,
  };

  return {
    props: data,
  };
};
