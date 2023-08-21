import { type StaticData } from "~/components/+pages/testimonials/_static-data";
import PageContent from "~/components/+pages/testimonials/+Entry";

export { getStaticProps } from "~/components/+pages/testimonials/_static-data";

const Page = (staticData: StaticData) => {
  return <PageContent staticData={staticData} />;
};

export default Page;
