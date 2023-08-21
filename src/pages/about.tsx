import { type StaticData } from "~/components/+pages/about/_static-data";
import AboutPage from "~/components/+pages/about/+Entry";

export { getStaticProps } from "~/components/+pages/about/_static-data";

const Page = (staticData: StaticData) => {
  return <AboutPage staticData={staticData} />;
};

export default Page;
