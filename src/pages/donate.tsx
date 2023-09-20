import { type StaticData } from "~/components/+pages/donate/_static-data";
import DonatePage from "~/components/+pages/donate/+Entry";

export { getStaticProps } from "~/components/+pages/donate/_static-data";

const Page = (staticData: StaticData) => {
  return <DonatePage staticData={staticData} />;
};

export default Page;