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

  page: ReturnType<(typeof processDbData)["programmesPage"]["crossProcess"]>;

  programmes: ReturnType<
    (typeof processDbData)["programme"]["crossProcess"]["many"]
  >;
};

export const getStaticProps: GetStaticProps<StaticData> = async () => {
  const footer = await myDb.footer.fetch();
  const header = await myDb.header.fetch();
  const linkLabels = await myDb.linkLabels.fetch();
  const orgDetails = await myDb.orgDetails.fetch();

  const page = await myDb.pages.programmes.fetch();

  const connectedDocsFetched = {
    programmes: await myDb.programme.fetchAll(),
  };

  const connectedDocsSelfValidated = {
    programmes: processDbData.programme.selfValidate.many(
      connectedDocsFetched.programmes,
    ),
  };

  const connectedImageIds = [
    orgDetails.logoImage.dbConnections.imageId,

    page.bannerImage.dbConnections.imageId,

    ...connectedDocsSelfValidated.programmes.flatMap((programme) => [
      programme.bannerImage.dbConnections.imageId,
      programme.summary.image.dbConnections.imageId,
    ]),
  ].flatMap((i) => (i ? [i] : []));

  const connectedImages = await myDb.image.fetchMany(connectedImageIds);

  const connectedDocsProcessed = {
    programmes: processDbData.programme.crossProcess.many(
      connectedDocsSelfValidated.programmes,
      { images: connectedImages },
    ),
  };

  const pageCrossProcessed = processDbData.programmesPage.crossProcess(page, {
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

    programmes: connectedDocsProcessed.programmes,
  };

  return {
    props: data,
  };
};
