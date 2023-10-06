import { useWindowSize } from "@react-hookz/web";

import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";
import { WithTooltip } from "~/components/WithTooltip";

import { type StaticData } from "../_static-data";

import { numberToArr, strWithFallback } from "~/helpers/utilities";
import type { ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["supporters"]>;

const Supporters = ({
  data: { entries, heading, subheading },
}: {
  data: Data;
}) => {
  const windowSize = useWindowSize();

  const numEntriesPerLine =
    windowSize.width < 640 ? 2 : windowSize.width < 768 ? 3 : 4;

  const numLastLineEntries = entries.length % numEntriesPerLine;

  const mainEntries = entries.slice(0, entries.length - numLastLineEntries);

  const lastLineEntries = entries.slice(entries.length - numLastLineEntries);
  const numLastLineSpaces = numEntriesPerLine - numLastLineEntries;
  const numDummyCompleteSpaces = Math.floor(numLastLineSpaces / 2);
  const isDummyHalfSpace = Boolean(
    numDummyCompleteSpaces - numLastLineSpaces / 2,
  );

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1100px]">
        <Ui.Section.Heading className="text-brandOrange">
          {strWithFallback(heading, "Supporters")}
        </Ui.Section.Heading>

        {subheading.length ? (
          <Ui.Section.Subheading>{subheading}</Ui.Section.Subheading>
        ) : null}

        <Ui.Section.VerticalSpace />

        <div className="flex justify-center">
          <div className="grid w-full max-w-full grid-cols-24 gap-2">
            {mainEntries.map((supporter) => (
              <Supporter supporter={supporter} key={supporter.id} />
            ))}

            {numberToArr(numDummyCompleteSpaces).map((i) => (
              <div
                className="col-span-12 sm:col-span-8 md:col-span-6"
                key={i}
              />
            ))}

            {isDummyHalfSpace ? (
              <div className="col-span-6 sm:col-span-4 md:col-span-3" />
            ) : null}

            {lastLineEntries.map((supporter) => (
              <Supporter supporter={supporter} key={supporter.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supporters;

const Supporter = ({ supporter }: { supporter: Data["entries"][number] }) => (
  <WithTooltip
    text={`visit ${supporter.name}'s site`}
    isDisabled={!supporter.name.length || !supporter.url.length}
  >
    <a
      href={supporter.url}
      className={`relative col-span-12 aspect-[16/9] min-h-0 min-w-0 p-sm sm:col-span-8 md:col-span-6 ${
        !supporter.url
          ? "pointer-events-none"
          : "cursor-pointer rounded-md transition-all duration-75 ease-in-out hover:bg-gray-100"
      }`}
      target="_blank"
    >
      <StorageImage
        urls={supporter.connectedImage.urls}
        objectFit="contain"
        sizes="200px"
      />
    </a>
  </WithTooltip>
);
