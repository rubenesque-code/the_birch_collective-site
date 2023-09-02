import type { GetStaticProps } from "next";

import processDbData from "~/helpers/process-db-data";
import { myDb } from "~/my-firebase/firestore";
import { queryForCommonData } from "~/pre-render-helpers/dbQuery";
import { type CommonData } from "~/pre-render-helpers/types";

export type StaticData = CommonData & PageSpecificData;

type PageSpecificData = {
  page: ReturnType<(typeof processDbData)["careersPage"]["crossProcess"]>;
};

export const getStaticProps: GetStaticProps<StaticData> = async () => {
  const { footer, header, linkLabels, orgDetails } = await queryForCommonData();

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
