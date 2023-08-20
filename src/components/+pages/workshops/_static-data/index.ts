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

  page: ReturnType<(typeof processDbData)["workshopsPage"]["crossProcess"]>;

  workshops: ReturnType<
    (typeof processDbData)["workshop"]["crossProcess"]["many"]
  >;
};

export const getStaticProps: GetStaticProps<StaticData> = async () => {
  const footer = await myDb.footer.fetch();
  const header = await myDb.header.fetch();
  const linkLabels = await myDb.linkLabels.fetch();
  const orgDetails = await myDb.orgDetails.fetch();

  const page = await myDb.pages.workshops.fetch();

  const connectedDocsFetched = {
    workshops: await myDb.workshop.fetchAll(),
  };

  const connectedDocsSelfValidated = {
    workshops: processDbData.workshop.selfValidate.many(
      connectedDocsFetched.workshops,
    ),
  };

  const connectedImageIds = [
    orgDetails.logoImage.dbConnections.imageId,

    page.bannerImage.dbConnections.imageId,

    ...connectedDocsSelfValidated.workshops.flatMap((workshop) => [
      workshop.bannerImage.dbConnections.imageId,
      workshop.summary.image.dbConnections.imageId,
    ]),
  ].flatMap((i) => (i ? [i] : []));

  const connectedImages = await myDb.image.fetchMany(connectedImageIds);

  const connectedDocsProcessed = {
    workshops: processDbData.workshop.crossProcess.many(
      connectedDocsSelfValidated.workshops,
      { images: connectedImages },
    ),
  };

  const pageCrossProcessed = processDbData.workshopsPage.crossProcess(page, {
    images: connectedImages,
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

    workshops: connectedDocsProcessed.workshops,
  };

  return {
    props: data,
  };
};
