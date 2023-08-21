import { type StaticData } from "~/components/+pages/volunteer/_static-data";
import PageContent from "~/components/+pages/volunteer/+Entry";

export { getStaticProps } from "~/components/+pages/volunteer/_static-data";

const Page = (staticData: StaticData) => {
  return <PageContent staticData={staticData} />;
};

export default Page;
