import { type StaticData } from "~/components/+pages/programme/_static-data";
import ProgrammePage from "~/components/+pages/programme/+Entry";

export {
  getStaticProps,
  getStaticPaths,
} from "~/components/+pages/programme/_static-data";

const Page = (staticData: StaticData) => {
  return <ProgrammePage staticData={staticData} />;
};

export default Page;
