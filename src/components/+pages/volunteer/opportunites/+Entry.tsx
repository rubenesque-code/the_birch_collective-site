import Ui from "~/components/ui-elements";

import type { StaticData } from "../_static-data";

import { type ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["opportunities"]>;

const Opportunities = ({ entries, heading }: Data) => (
  <div>
    <Ui.Section.Heading className="text-brandOrange">
      {heading}
    </Ui.Section.Heading>

    <Ui.Section.VerticalSpace />

    <div className="">
      {entries.length ? (
        <div className="grid gap-x-xl gap-y-xl sm:grid-cols-2">
          {entries.map((entry) => (
            <Position {...entry} key={entry.id} />
          ))}
        </div>
      ) : (
        <p className="custom-prose prose">
          None at the moment. Please check back later.
        </p>
      )}
    </div>
  </div>
);

export default Opportunities;

const Position = ({ name, text }: Data["entries"][number]) => (
  <div className="group/position">
    <div className="text-center font-display text-3xl font-bold tracking-wide text-brandOrange">
      {name}
    </div>
    <div className="custom-prose prose mt-sm w-full max-w-full">{text}</div>
  </div>
);
