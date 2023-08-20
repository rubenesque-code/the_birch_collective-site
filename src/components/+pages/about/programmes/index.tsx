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
      <div className="flex flex-wrap justify-center gap-y-6">
        {entries.map((programme) => (
          <Link
            href={`${route.programmes}/${programme.id}`}
            passHref
            key={programme.id}
          >
            <div className="w-full cursor-pointer px-5 text-center md:w-1/2">
              <div className="flex flex-col items-center">
                <span className="whitespace-nowrap font-display text-3xl font-bold uppercase tracking-wider text-brandLightOrange">
                  <Markdown>{programme.title}</Markdown>
                </span>
                <span className="uppercase text-display xs:text-lg lg:text-xl">
                  <Markdown>{programme.subtitle}</Markdown>
                </span>
                <p className="text-center text-base font-light xs:font-normal lg:text-lg">
                  <Markdown>{programme.summary.mainText}</Markdown>
                </p>
              </div>
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
