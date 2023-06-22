import { type GetStaticProps } from "next";

import Layout from "~/components/layouts";
import { myDb } from "~/firebase/firestore/fetch";
import { pick } from "~/helpers/utilities";
import { type EditableLabels, type OrgDetails } from "~/types/database";

// get set up with fetching db data:
//  async functions
//  validation: zod, other packages, approaches

// □ images. inc. extension. do on cms first?
// □ test db requests?

export default function Home({ data: dbData }: { data: StaticData }) {
  return (
    <Layout.Primary
      childComponentProps={{
        footer: {
          siteLinkLabels: pick(
            dbData.sectionLabels,
            "about",
            "programmes",
            "workshops",
            "donate",
            "volunteer",
          ),
          orgDetails: dbData.orgDetails,
        },
      }}
    >
      <div>Home</div>
    </Layout.Primary>
  );
}

type StaticData = {
  sectionLabels: EditableLabels["sections"];
  orgDetails: OrgDetails;
};

export const getStaticProps: GetStaticProps = async () => {
  const sectionLabels = await myDb.fetch.editableLabels.sections();
  const orgDetails = await myDb.fetch.orgDetails();

  const data: StaticData = {
    sectionLabels,
    orgDetails,
  };

  return {
    props: {
      data,
    },
  };
};
