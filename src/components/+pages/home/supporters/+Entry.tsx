import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";
import { WithTooltip } from "~/components/WithTooltip";

import { type StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
import type { ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["supporters"]>;

const Supporters = ({
  data: { entries, heading, subheading },
}: {
  data: Data;
}) => {
  /*   const windowSize = useWindowSize();

  const numPerLine =
    windowSize.width < 410 ? 2 : windowSize.width < 768 ? 3 : 4;

  // const entriesFullLines = Math.floor(entries.length / numPerLine)

  const numEntriesToSplit = entries.length % numPerLine;
  console.log("numEntriesToSplit:", numEntriesToSplit);

  const lastLineEntries = entries.slice(entries.length - numEntriesToSplit);
  console.log("lastLineEntries:", lastLineEntries);
  const gridEntries = entries.slice(0, entries.length - numEntriesToSplit);
  console.log("gridEntries:", gridEntries); */

  return (
    <div className="">
      <Ui.Section.Heading className="text-brandOrange">
        {strWithFallback(heading, "Supporters")}
      </Ui.Section.Heading>

      {subheading.length ? (
        <Ui.Section.Subheading>{subheading}</Ui.Section.Subheading>
      ) : null}

      <Ui.Section.VerticalSpace />

      <div className="grid grid-cols-2 gap-lg xs:grid-cols-3 sm:gap-xl md:grid-cols-4 md:gap-xl">
        {entries.map((supporter) => (
          <Supporter data={supporter} key={supporter.id} />
        ))}
      </div>

      {/* <div
        className="grid justify-center gap-lg sm:gap-xl md:gap-xl"
        style={{
          gridTemplateColumns: `repeat(${3}, minmax(0, 1fr))`,
        }}
      >
        {lastLineEntries.map((supporter) => (
          <Supporter data={supporter} key={supporter.id} />
        ))}
      </div> */}
    </div>
  );
};

export default Supporters;

const Supporter = ({ data }: { data: Data["entries"][number] }) => (
  <WithTooltip
    text={`visit ${data.name}'s site`}
    isDisabled={!data.name.length || !data.url.length}
  >
    <a
      href={data.url}
      className={`max-w-[200px] ${
        !data.url
          ? "pointer-events-none"
          : "cursor-pointer rounded-md transition-all duration-75 ease-in-out hover:bg-gray-100 md:p-sm"
      }`}
      target="_blank"
    >
      <div className="relative">
        <div className="relative aspect-[16/9]">
          <StorageImage
            urls={data.connectedImage.urls}
            objectFit="contain"
            sizes="100px"
          />
        </div>
      </div>
    </a>
  </WithTooltip>
);
