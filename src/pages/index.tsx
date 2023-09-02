import { type StaticData } from "~/components/+pages/home/_static-data";
import HomePage from "~/components/+pages/home/+Entry";

export { getStaticProps } from "~/components/+pages/home/_static-data";

const Page = (staticData: StaticData) => {
  return <HomePage {...staticData} />;
};

export default Page;
