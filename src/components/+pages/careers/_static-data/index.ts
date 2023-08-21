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

  page: ReturnType<(typeof processDbData)["careersPage"]["crossProcess"]>;
};

export const getStaticProps: GetStaticProps<StaticData> = async () => {
  const footer = await myDb.footer.fetch();
  const header = await myDb.header.fetch();
  const linkLabels = await myDb.linkLabels.fetch();
  const orgDetails = await myDb.orgDetails.fetch();

  const page = await myDb.pages.career.fetch();

  const connectedDocIds = {
    careers: page.careers.entries.map((entry) => entry.dbConnections.careerId),
  };

  const connectedDocsFetched = {
    careers: await myDb.career.fetchMany(connectedDocIds.careers),
  };

  const connectedDocsSelfValidated = {
    careers: processDbData.career.selfValidate.many(
      connectedDocsFetched.careers,
    ),
  };

  const connectedImageIds = [
    orgDetails.logoImage.dbConnections.imageId,

    page.bannerImage.dbConnections.imageId,
  ].flatMap((i) => (i ? [i] : []));

  const connectedImages = await myDb.image.fetchMany(connectedImageIds);

  const connectedDocsProcessed = {
    careers: processDbData.career.process.many(
      connectedDocsSelfValidated.careers,
    ),
  };

  const pageCrossProcessed = processDbData.careersPage.crossProcess(page, {
    images: connectedImages,
    careers: connectedDocsProcessed.careers,
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
