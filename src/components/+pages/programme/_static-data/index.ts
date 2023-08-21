import type { GetStaticPaths, GetStaticProps } from "next";

import processDbData from "~/helpers/process-db-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";
import { type MyExclude } from "~/types/utilities";

type PageValidAndProcessed = MyExclude<
  ReturnType<(typeof processDbData)["programme"]["crossProcess"]>,
  "requirements not met"
>;

export type StaticData = {
  footer: MyDb["singles"]["footer"];
  header: MyDb["singles"]["header"];
  linkLabels: MyDb["singles"]["linkLabels"];
  orgDetails: MyDb["singles"]["orgDetails"];
  logoImage: MyDb["image"] | null;

  page: PageValidAndProcessed;
};

export const getStaticProps: GetStaticProps<StaticData> = async ({
  params,
}) => {
  const footer = await myDb.footer.fetch();
  const header = await myDb.header.fetch();
  const linkLabels = await myDb.linkLabels.fetch();
  const orgDetails = await myDb.orgDetails.fetch();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const page = await myDb.programme.fetchOne(params!.id as string);

  const connectedImageIds = [
    orgDetails.logoImage.dbConnections.imageId,

    page.bannerImage.dbConnections.imageId,
    ...(!page.usePosters
      ? []
      : page.posters.flatMap((poster) => poster.image.dbConnections.imageId)),
    ...(!page.photoAlbum.use
      ? []
      : page.photoAlbum.entries.flatMap(
          (enry) => enry.image.dbConnections.imageId,
        )),
    page.summary.image.dbConnections.imageId,
  ].flatMap((i) => (i ? [i] : []));

  const connectedImages = await myDb.image.fetchMany(connectedImageIds);

  const pageCrossProcessed = processDbData.programme.crossProcess(page, {
    images: connectedImages,
  }) as PageValidAndProcessed;

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
  const programmes = await myDb.programme.fetchAll();

  const programmesSelfValidated =
    processDbData.programme.selfValidate.many(programmes);

  const connectedImageIds = [
    ...programmesSelfValidated.flatMap((programme) => [
      programme.bannerImage.dbConnections.imageId,
      programme.summary.image.dbConnections.imageId,
    ]),
  ].flatMap((i) => (i ? [i] : []));

  const connectedImages = await myDb.image.fetchMany(connectedImageIds);

  const programmesCrossValidated = processDbData.programme.crossProcess.many(
    programmesSelfValidated,
    { images: connectedImages },
  );

  const paths = programmesCrossValidated.map((programme) => ({
    params: {
      id: programme.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
