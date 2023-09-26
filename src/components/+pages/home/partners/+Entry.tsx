import { useWindowSize } from "@react-hookz/web";

import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";
import { WithTooltip } from "~/components/WithTooltip";

import { type StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
import type { ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["partners"]>;

const Partners = ({
  data: { entries, heading, subheading },
}: {
  data: Data;
}) => {
  const windowSize = useWindowSize();

  const numPerLine =
    windowSize.width < 410 ? 2 : windowSize.width < 768 ? 3 : 4;

  const numEntriesToSplit = entries.length % numPerLine;

  const mainEntries = entries.slice(0, entries.length - numEntriesToSplit);

  const lastLineEntries = entries.slice(entries.length - numEntriesToSplit);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1100px]">
        <Ui.Section.Heading className="text-brandLightOrange">
          {strWithFallback(heading, "Partners")}
        </Ui.Section.Heading>

        {subheading.length ? (
          <Ui.Section.Subheading className="px-md">
            {subheading}
          </Ui.Section.Subheading>
        ) : null}

        <Ui.Section.VerticalSpace />

        <div className="grid grid-cols-24 gap-lg">
          {mainEntries.map((supporter) => (
            <Partner data={supporter} key={supporter.id} />
          ))}

          {lastLineEntries.length < numPerLine &&
          Math.floor((numPerLine - lastLineEntries.length) / 2)
            ? [
                ...Array(
                  Math.floor((numPerLine - lastLineEntries.length) / 2),
                ).keys(),
              ].map((i) => (
                <div
                  className="col-span-12 xs:col-span-8 md:col-span-6"
                  key={i}
                />
              ))
            : null}

          {lastLineEntries.length < numPerLine ? (
            <div className="col-span-6 xs:col-span-4 md:col-span-3" />
          ) : null}

          {lastLineEntries.map((supporter) => (
            <Partner data={supporter} key={supporter.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;

const Partner = ({ data }: { data: Data["entries"][number] }) => (
  <WithTooltip
    text={`visit ${data.name}'s site`}
    isDisabled={!data.name.length || !data.url.length}
  >
    <a
      href={data.url}
      className={`col-span-12 xs:col-span-8 md:col-span-6 ${
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
            sizes="200px"
          />
        </div>
      </div>
    </a>
  </WithTooltip>
);
