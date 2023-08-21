import { IconSwith } from "~/components/IconSwitch";

import { type StaticData } from "../_static-data";

import { textColourSwith } from "~/helpers/style-switch";

type Data = StaticData["page"]["sections"];

const Sections = ({ data }: { data: Data }) => (
  <div className="grid grid-cols-1 gap-xl">
    {data.map((section) => (
      <Section {...section} key={section.id} />
    ))}
  </div>
);

export default Sections;

const Section = ({ bullets, colour, description, title }: Data[number]) => {
  return (
    <div className="group/section">
      <div
        className={`mt-sm font-display text-6xl font-bold tracking-wide ${textColourSwith(
          colour,
        )}`}
      >
        {title}
      </div>

      {description?.length ? (
        <div className="custom-prose prose mt-sm max-w-full font-medium">
          {description}
        </div>
      ) : null}

      <div className="mt-sm grid grid-cols-1 gap-sm">
        {bullets.entries.map((bullet) => (
          <Bullet
            bullet={bullet}
            bulletType={bullets.type}
            colour={colour}
            iconType={bullets.icon}
            key={bullet.id}
          />
        ))}
      </div>
    </div>
  );
};

const Bullet = ({
  bullet: { text, title },
  colour,
  iconType,
  bulletType,
}: {
  bullet: Data[number]["bullets"]["entries"][number];
  colour: Data[number]["colour"];
  iconType: Data[number]["bullets"]["icon"];
  bulletType: Data[number]["bullets"]["type"];
}) => {
  return (
    <div className="group/bullet flex items-center gap-sm">
      <div className={`relative text-2xl ${textColourSwith(colour)}`}>
        <IconSwith iconName={iconType} />
      </div>
      <div className="flex-grow flex-col">
        {bulletType === "text-and-title" && title?.length ? (
          <div className="custom-prose prose w-full max-w-full font-semibold">
            {title}
          </div>
        ) : null}

        {text.length ? (
          <div className="custom-prose prose w-full max-w-full">{text}</div>
        ) : null}
      </div>
    </div>
  );
};
