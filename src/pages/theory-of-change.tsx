import { type StaticData } from "~/components/+pages/theory-of-change/_static-data";
import PageContent from "~/components/+pages/theory-of-change/+Entry";

export { getStaticProps } from "~/components/+pages/theory-of-change/_static-data";

const Page = (staticData: StaticData) => {
  return <PageContent staticData={staticData} />;
};

export default Page;
