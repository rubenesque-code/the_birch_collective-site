import Markdown from "markdown-to-jsx";

import { Icon } from "~/components/icons";

import { type StaticData } from "../_static-data";

type SectionStaticData = NonNullable<StaticData["page"]["aboutUs"]>;

const AboutUs = ({ staticData }: { staticData: SectionStaticData }) => {
  return (
    <div className="group/about flex flex-col items-center">
      <Heading heading={staticData.heading} />
      <div className="flex w-full flex-col items-center pl-2xl">
        <Bullets staticData={staticData.entries} />
      </div>
      <GoToPageButton text={staticData.buttonText} />
    </div>
  );
};

export default AboutUs;

const Heading = ({ heading }: { heading: string }) => (
  <div className="w-full text-center font-display text-6xl font-bold text-brandGreen">
    <Markdown>{heading}</Markdown>
  </div>
);

const Bullets = ({
  staticData,
}: {
  staticData: SectionStaticData["entries"];
}) => (
  <div className="mt-xl grid w-full grid-cols-1 gap-sm">
    {staticData.map((bullet) => (
      <Entry staticData={bullet} key={bullet.id} />
    ))}
  </div>
);

const Entry = ({
  staticData,
}: {
  staticData: SectionStaticData["entries"][number];
}) => (
  <div className="group/entry relative flex w-full gap-sm">
    <div className="text-2xl text-brandGreen">
      <Icon.AboutUs />
    </div>
    <div className="flex-grow text-2xl">{staticData.text}</div>
  </div>
);

const GoToPageButton = ({ text }: { text: string }) => (
  <div className="flex cursor-pointer items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold uppercase tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
    <span>{text}</span>
    <div className="">
      <Icon.ArrowRight />
    </div>
  </div>
);
