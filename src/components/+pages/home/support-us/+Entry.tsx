import Markdown from "markdown-to-jsx";

import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";

import type { StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
import type { ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["supportUs"]>;

const SupportUs = ({
  data: { donate, heading, volunteer },
}: {
  data: Data;
}) => (
  <div className="">
    <Ui.Section.Heading>
      {strWithFallback(heading, "Support The Birch Collective")}
    </Ui.Section.Heading>
    <div className="mt-xl grid grid-cols-2 gap-md">
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
      />

      <div className="absolute bottom-0 left-0 flex cursor-pointer items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
        <Markdown>{buttonText}</Markdown>
      </div>
    </div>

    <div className="mt-5 xs:mt-6 md:mt-8">
      <div className="text-center font-normal lg:text-xl">
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

      <div className="absolute bottom-0 left-0 flex cursor-pointer items-center gap-sm rounded-sm bg-brandGreen px-4 py-2 text-lg font-bold tracking-wide text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xl">
        <Markdown>{buttonText}</Markdown>
      </div>
    </div>

    <div className="mt-5 xs:mt-6 md:mt-8">
      <div className="text-center font-normal lg:text-xl">
        <Markdown>{description}</Markdown>
      </div>
    </div>
  </div>
);
