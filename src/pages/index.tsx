import { type GetStaticProps } from "next";

import Layout from "~/components/layouts";
import { myDb } from "~/firebase/firestore/fetch";
import { pick } from "~/helpers/utilities";
import { type EditableLabels, type OrgDetails } from "~/types/database";

// testing
// get set up with fetching db data:
//  async functions
//  validation: zod, other packages, approaches

// □ @ianvs prettier plugin not working - error message in vscode output

export default function Home({ data: dbData }: { data: StaticData }) {
  // console.log("data:", data);

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
