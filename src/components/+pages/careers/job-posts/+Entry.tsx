import Markdown from "markdown-to-jsx";

import { Icon } from "~/components/icons";
import Ui from "~/components/ui-elements";
import { WithTooltip } from "~/components/WithTooltip";

import type { StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
import { type ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["careers"]>;

const JobPosts = ({ entries, heading }: Data) => (
  <div>
    <Ui.Section.Heading className="text-brandRed">{heading}</Ui.Section.Heading>

    <Ui.Section.VerticalSpace />

    <div className="mt-md">
      <Entries data={entries} />
    </div>
  </div>
);

export default JobPosts;

const Entries = ({ data }: { data: Data["entries"] }) => {
  return (
    <div className="mt-lg grid gap-x-lg gap-y-xl md:grid-cols-2">
      {data.map((jobPost) => (
        <JobPost data={jobPost} key={jobPost.id} />
      ))}
    </div>
  );
};

const JobPost = ({ data }: { data: Data["entries"][number] }) => {
  return (
    <div className="group/career relative">
      <div className="mt-sm">
        <div className="border-b border-gray-300 pb-sm">
          <div className="text-lg font-medium">{data.title}</div>

          {data.closingDate.length ? (
            <div className="mt-xs">
              <div className="flex items-center gap-xs text-gray-500">
                <span>
                  <Icon.Date />
                </span>
                <div className="flex gap-xs">
                  <span>Closes, </span>
                  <span>{data.closingDate}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="custom-prose prose mt-sm w-full max-w-full">
          <Markdown>{data.description}</Markdown>
        </div>

        <div className="mt-md">
          {data.docLinksText?.length ? (
            <div className="text-gray-600">{data.docLinksText}</div>
          ) : null}

          {data.docLinkButtons.length ? (
            <div className="mt-sm">
              <div className="flex flex-wrap items-center gap-x-md gap-y-sm">
                {data.docLinkButtons.map((button) => (
                  <DocLinkButton data={button} key={button.id} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const DocLinkButton = ({
  data,
}: {
  data: Data["entries"][number]["docLinkButtons"][number];
}) => (
  <WithTooltip text="Click to download document">
    <a href={data.link} rel="noreferrer" download>
      <div className="group/doc-link-button relative flex cursor-pointer items-center gap-xs rounded-sm border border-blue-400 px-sm py-xxs transition-all duration-75 ease-in-out hover:bg-gray-100">
        <span className="grid place-items-center text-blue-400">
          <Icon.Download />
        </span>
        <span className="text-gray-600">
          {strWithFallback(data.text, "Download application")}
        </span>
      </div>
    </a>
  </WithTooltip>
);
