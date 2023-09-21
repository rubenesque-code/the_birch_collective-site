import { type StaticData } from "~/components/+pages/donate-success/_static-data";
import Content from "~/components/+pages/donate-success/+Entry";

export { getStaticProps } from "~/components/+pages/donate-success/_static-data";

const Page = (staticData: StaticData) => {
  return <Content staticData={staticData} />;
};

export default Page;
