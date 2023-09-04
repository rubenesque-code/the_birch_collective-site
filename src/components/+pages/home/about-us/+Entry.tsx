import Markdown from "markdown-to-jsx";

import { Icon } from "~/components/icons";
import Section from "~/components/ui-elements/Section";

import { type StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
import { type ExcludeNotInUse } from "~/types/database/_helpers";

type SectionStaticData = NonNullable<StaticData["page"]["aboutUs"]>;

type Data = ExcludeNotInUse<SectionStaticData>;

const AboutUs = ({ data }: { data: Data }) => (
  <div className="">
    <Heading heading={data.heading} />

    <Section.VerticalSpace />

    <Bullets data={data.entries} />

    <Section.VerticalSpace />

    <GoToPageButton text={strWithFallback(data.buttonText, "About Us")} />
  </div>
);

export default AboutUs;

const Heading = ({ heading }: { heading: string }) => (
  <div className="w-full text-center font-display text-4xl font-bold text-brandGreen sm:text-5xl md:text-6xl">
    <Markdown>{heading}</Markdown>
  </div>
);

const Bullets = ({ data }: { data: Data["entries"] }) => (
  <div className="flex justify-center">
    <div className="inline-flex flex-col items-start gap-sm px-sm">
      {data.map((bullet) => (
        <Entry data={bullet} key={bullet.id} />
      ))}
    </div>
  </div>
);

const Entry = ({ data }: { data: Data["entries"][number] }) => (
  <div className="relative flex max-w-[62ch] items-center gap-sm">
    <div className="text-brandGreen opacity-80">
      <Icon.AboutUs size="2xl" />
    </div>

    <div className="custom-prose prose flex-grow text-lg sm:text-xl">
      <Markdown>{data.text}</Markdown>
    </div>
  </div>
);

const GoToPageButton = ({ text }: { text: string }) => (
  <div className="flex w-full justify-center">
    <div className="inline-flex cursor-pointer items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 font-bold uppercase tracking-wide text-white xs:text-lg sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
      <span>{text}</span>

      <div className="">
        <Icon.ArrowRight />
      </div>
    </div>
  </div>
);
