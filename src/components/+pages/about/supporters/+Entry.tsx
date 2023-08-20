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
}) => (
  <div className="">
    <div className="">
      <Ui.Section.Heading>
        {strWithFallback(heading, "Supporters")}
      </Ui.Section.Heading>

      {subheading.length ? (
        <Ui.Section.Subheading>{subheading}</Ui.Section.Subheading>
      ) : null}
    </div>

    <div className="mt-lg grid grid-cols-4 gap-lg">
      {entries.map((supporter) => (
        <Supporter data={supporter} key={supporter.id} />
      ))}
    </div>
  </div>
);

export default Supporters;

const Supporter = ({ data }: { data: Data["entries"][number] }) => (
  <WithTooltip
    text={`visit ${data.name}'s site`}
    isDisabled={!data.name.length || !data.url.length}
  >
    <a
      href={data.url}
      className={`${!data.url ? "pointer-events-none" : "cursor-pointer"}`}
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
