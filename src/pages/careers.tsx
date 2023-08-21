import { type StaticData } from "~/components/+pages/careers/_static-data";
import CareersPage from "~/components/+pages/careers/+Entry";

export { getStaticProps } from "~/components/+pages/careers/_static-data";

const Page = (staticData: StaticData) => {
  return <CareersPage staticData={staticData} />;
};

export default Page;
