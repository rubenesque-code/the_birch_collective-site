import { GetStaticProps } from "next";

import Layout from "~/components/layouts";
import { pick } from "~/helpers/utilities";
import { myDb } from "~/lib/firebase/firestore/fetch";
import { EditableLabels } from "~/types/database";

// testing
// get set up with fetching db data:
//  async functions
//  validation: zod, other packages, approaches

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
        },
      }}
    >
      <div>Volunteer</div>
    </Layout.Primary>
  );
}

type StaticData = {
  sectionLabels: EditableLabels["sections"];
};

export const getStaticProps: GetStaticProps = async () => {
  const sectionLabels = await myDb.fetch.editableLabels.sections();

  const data: StaticData = {
    sectionLabels,
  };

  return {
    props: {
      data,
    },
  };
};
