import type { GetStaticPaths, GetStaticProps } from "next";

import processDbData from "~/helpers/process-db-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

export type StaticData = {
  footer: MyDb["singles"]["footer"];
  header: MyDb["singles"]["header"];
  linkLabels: MyDb["singles"]["linkLabels"];
  orgDetails: MyDb["singles"]["orgDetails"];
  logoImage: MyDb["image"] | null;

  page: ReturnType<(typeof processDbData)["workshop"]["crossProcess"]>;
};

export const getStaticProps: GetStaticProps<StaticData> = async ({
  params,
}) => {
  const footer = await myDb.footer.fetch();
  const header = await myDb.header.fetch();
  const linkLabels = await myDb.linkLabels.fetch();
  const orgDetails = await myDb.orgDetails.fetch();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const page = await myDb.workshop.fetchOne(params!.id as string);

  const connectedImageIds = [
    orgDetails.logoImage.dbConnections.imageId,

    page.bannerImage.dbConnections.imageId,
    ...(!page.photoAlbum.use
      ? []
      : page.photoAlbum.entries.flatMap(
          (enry) => enry.image.dbConnections.imageId,
        )),
    page.summary.image.dbConnections.imageId,
  ].flatMap((i) => (i ? [i] : []));

  const connectedImages = await myDb.image.fetchMany(connectedImageIds);

  const pageCrossProcessed = processDbData.workshop.crossProcess(page, {
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
  };

  return {
    props: data,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const workshops = await myDb.workshop.fetchAll();

  const workshopsSelfValidated =
    processDbData.workshop.selfValidate.many(workshops);

  const connectedImageIds = [
    ...workshopsSelfValidated.flatMap((workshop) => [
      workshop.bannerImage.dbConnections.imageId,
      workshop.summary.image.dbConnections.imageId,
    ]),
  ].flatMap((i) => (i ? [i] : []));

  const connectedImages = await myDb.image.fetchMany(connectedImageIds);

  const workshopsCrossValidated = processDbData.workshop.crossProcess.many(
    workshopsSelfValidated,
    { images: connectedImages },
  );

  const paths = workshopsCrossValidated.map((workshop) => ({
    params: {
      id: workshop.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
