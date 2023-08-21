import { type StaticData } from "~/components/+pages/programmes/_static-data";
import ProgrammesPage from "~/components/+pages/programmes/+Entry";

export { getStaticProps } from "~/components/+pages/programmes/_static-data";

const Page = (staticData: StaticData) => {
  return <ProgrammesPage staticData={staticData} />;
};

export default Page;
