import { type StaticData } from "~/components/+pages/workshop/_static-data";
import PageContent from "~/components/+pages/workshop/+Entry";

export {
  getStaticProps,
  getStaticPaths,
} from "~/components/+pages/workshop/_static-data";

const Page = (staticData: StaticData) => {
  return <PageContent staticData={staticData} />;
};

export default Page;
