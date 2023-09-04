import Link from "next/link";
import Markdown from "markdown-to-jsx";

import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";
import Section from "~/components/ui-elements/Section";

import type { StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
import { route } from "~/static-data/routes";
import type { ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["supportUs"]>;

const SupportUs = ({
  data: { donate, heading, volunteer },
}: {
  data: Data;
}) => (
  <div className="">
    <Ui.Section.Heading className="text-brandGreen">
      {strWithFallback(heading, "Support The Birch Collective")}
    </Ui.Section.Heading>

    <Section.VerticalSpace />

    <div className="grid gap-md px-sm md:grid-cols-2 md:px-0">
      <Donate data={donate} />
      <Volunteer data={volunteer} />
    </div>
  </div>
);

export default SupportUs;

const Donate = ({
  data: { buttonText, description, image },
}: {
  data: Data["donate"];
}) => (
  <div>
    <div className="relative aspect-[1/1]">
      <StorageImage
        urls={image.connectedImage.urls}
        position={image.position}
        sizes="(max-width: 768px) 50vw, 90vw"
      />

      <Link
        as="div"
        href={route.donate}
        className="absolute bottom-0 left-0 flex items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl"
      >
        <Markdown>{buttonText}</Markdown>
      </Link>
    </div>

    <div className="mt-5 xs:mt-6 md:mt-8">
      <div className="custom-prose prose text-center font-normal lg:text-xl">
        <Markdown>{description}</Markdown>
      </div>
    </div>
  </div>
);

const Volunteer = ({
  data: { buttonText, description, image },
}: {
  data: Data["volunteer"];
}) => (
  <div>
    <div className="relative aspect-[1/1]">
      <StorageImage
        urls={image.connectedImage.urls}
        position={image.position}
      />

      <Link
        as="div"
        href={route.volunteer}
        className="absolute bottom-0 left-0 flex items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl"
      >
        <Markdown>{buttonText}</Markdown>
      </Link>
    </div>

    <div className="mt-5 xs:mt-6 md:mt-8">
      <div className="custom-prose prose text-center font-normal lg:text-xl">
        <Markdown>{description}</Markdown>
      </div>
    </div>
  </div>
);
