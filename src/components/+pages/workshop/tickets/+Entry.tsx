import { Icon } from "~/components/icons";

import type { StaticData } from "../_static-data";

import { type ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["tickets"]>;

const Tickets = ({ heading, signUpButton, text }: Data) => (
  <div className="">
    <div className="font-display text-3xl font-bold tracking-wider text-brandGreen">
      {heading}
    </div>

    <div className="custom-prose prose mt-sm w-full max-w-full">{text}</div>

    <a
      className="mt-md inline-flex cursor-pointer items-center gap-sm rounded-lg bg-brandGreen px-sm py-xs text-white"
      href={signUpButton.link}
    >
      {signUpButton.text}

      <span>
        <Icon.ExternalLink />
      </span>
    </a>
  </div>
);

export default Tickets;
