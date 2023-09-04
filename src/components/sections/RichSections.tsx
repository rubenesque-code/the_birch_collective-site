import React from "react";

import { IconSwith } from "~/components/IconSwitch";
import Ui from "~/components/ui-elements";

import { textColourSwith } from "~/helpers/style-switch";
import type { RichSection } from "~/types/database/_common";

type Data = RichSection[];

export const RichSections = ({ data }: { data: Data }) => (
  <div className="grid grid-cols-1">
    {data.map((section) => (
      <React.Fragment key={section.id}>
        <Ui.Section.VerticalSpace />
        <Section {...section} />
      </React.Fragment>
    ))}
  </div>
);

const Section = ({ bullets, colour, description, title }: Data[number]) => (
  <div className="group/section">
    <Ui.Section.Heading className={`${textColourSwith(colour)} !text-left`}>
      {title}
    </Ui.Section.Heading>

    {description?.length ? (
      <Ui.Section.Description className="mt-sm font-medium">
        {description}
      </Ui.Section.Description>
    ) : null}

    <div className="mt-sm grid grid-cols-1 gap-xs sm:gap-sm">
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
}) => (
  <div className="group/bullet flex items-center gap-sm">
    <div className={`relative text-xl sm:text-2xl ${textColourSwith(colour)}`}>
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
