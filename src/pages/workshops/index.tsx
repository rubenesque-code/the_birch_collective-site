import { type StaticData } from "~/components/+pages/workshops/_static-data";
import PageContent from "~/components/+pages/workshops/+Entry";

export { getStaticProps } from "~/components/+pages/workshops/_static-data";

const Page = (staticData: StaticData) => {
  return <PageContent staticData={staticData} />;
};

export default Page;
