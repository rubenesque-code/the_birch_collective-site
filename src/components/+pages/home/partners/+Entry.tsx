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
}) => (
  <div className="">
    <Ui.Section.Heading className="text-brandLightOrange">
      {strWithFallback(heading, "Partners")}
    </Ui.Section.Heading>

    {subheading.length ? (
      <Ui.Section.Subheading>{subheading}</Ui.Section.Subheading>
    ) : null}

    <Ui.Section.VerticalSpace />

    <div className="g grid grid-cols-4 gap-md">
      {entries.map((partner) => (
        <Partner data={partner} key={partner.id} />
      ))}
    </div>
  </div>
);

export default Partners;

const Partner = ({ data }: { data: Data["entries"][number] }) => (
  <WithTooltip
    text={`visit ${data.name}'s site`}
    isDisabled={!data.name.length || !data.url.length}
  >
    <a
      href={data.url}
      className={`${
        !data.url
          ? "pointer-events-none"
          : "cursor-pointer rounded-md p-sm transition-all duration-75 ease-in-out hover:bg-gray-100 "
      }`}
      target="_blank"
    >
      <div className="relative">
        <div className="relative aspect-[16/9]">
          <StorageImage urls={data.connectedImage.urls} objectFit="contain" />
        </div>
      </div>
    </a>
  </WithTooltip>
);
