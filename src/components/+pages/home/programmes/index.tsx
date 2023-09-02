import Link from "next/link";
import Markdown from "markdown-to-jsx";

import { Icon } from "~/components/icons";
import Ui from "~/components/ui-elements";

import { type StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
import { route } from "~/static-data/routes";
import type { ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["programmes"]>;

const Programmes = ({
  data: { buttonText, entries, heading, subheading },
}: {
  data: Data;
}) => (
  <>
    <Ui.Section.Heading className="text-brandLightOrange">
      {strWithFallback(heading, "Programmes")}
    </Ui.Section.Heading>

    <Ui.Section.Subheading>
      {strWithFallback(
        subheading,
        "We have a range of programmes to suit everyone, from online courses to residential programmes.",
      )}
    </Ui.Section.Subheading>

    <Ui.Section.VerticalSpace />

    <div className="">
      <div className="flex w-full flex-wrap gap-y-sm">
        {entries.map((programme) => (
          <Link
            href={`${route.programmes}/${programme.id}`}
            passHref
            as="div"
            className="w-1/2 cursor-pointer rounded-lg px-sm py-sm text-center transition-all duration-100 ease-in-out hover:bg-gray-100"
            key={programme.id}
          >
            <div className="flex flex-col items-center">
              <span className="text-center font-display text-4xl font-bold tracking-wider text-brandLightOrange opacity-90">
                <Markdown>{programme.title}</Markdown>
              </span>
              <span className="mt-xxs uppercase text-brandBrown opacity-90 xs:text-lg lg:text-xl">
                <Markdown>{programme.subtitle}</Markdown>
              </span>
              <p className="custom-prose prose mt-xxs max-w-[290px] text-center text-base font-light">
                <Markdown>{programme.summary.mainText}</Markdown>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <Ui.Section.VerticalSpace />

    <div className="flex justify-center">
      <Link href={route.programmes} passHref>
        <div className="flex cursor-pointer place-items-center gap-1 bg-brandLightOrange px-3 py-2 font-semibold uppercase text-white xs:text-lg sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
          <Markdown>{buttonText}</Markdown>
          <Icon.ArrowRight />
        </div>
      </Link>
    </div>
  </>
);

export default Programmes;
