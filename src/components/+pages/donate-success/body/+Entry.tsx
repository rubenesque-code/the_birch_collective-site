import Ui from "~/components/ui-elements";

import type { StaticData } from "../_static-data";

import { type ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["body"]>;

const Body = ({
  heading,
  donationAmount,
}: Data & { donationAmount: string }) => {
  return (
    <div className="relative">
      <div className="text-center text-4xl">{heading}</div>

      <Ui.Section.VerticalSpace />

      <div className="flex justify-center">
        <p className="text-2xl">{donationAmount}</p>
      </div>
    </div>
  );
};

export default Body;
