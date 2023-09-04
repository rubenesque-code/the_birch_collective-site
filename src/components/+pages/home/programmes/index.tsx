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
      <div className="grid w-full grid-cols-1 gap-y-xs sm:grid-cols-2 sm:gap-y-sm">
        {entries.map((programme) => (
          <Link
            href={`${route.programmes}/${programme.id}`}
            passHref
            as="div"
            className="cursor-pointer rounded-lg p-xs text-center transition-all duration-100 ease-in-out hover:bg-gray-100 sm:px-sm sm:py-sm"
            key={programme.id}
          >
            <div className="flex flex-col items-center">
              <span className="max-w-[350px] text-center font-display text-3xl font-bold tracking-wider text-brandLightOrange opacity-90 sm:text-4xl">
                <Markdown>{programme.title}</Markdown>
              </span>

              <span className="mt-xxs max-w-[350px] uppercase text-brandBrown opacity-90 xs:text-lg  lg:text-xl">
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
