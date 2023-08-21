import { Icon } from "~/components/icons";
import { WithTooltip } from "~/components/WithTooltip";

import type { StaticData } from "../_static-data";

const MainText = ({
  page,
  socialMediaLinks,
}: {
  page: StaticData["page"];
  socialMediaLinks: StaticData["orgDetails"]["socialMediaLinks"];
}) => {
  return (
    <div className="group/main">
      <div className="custom-prose prose mt-sm w-full max-w-full">
        {page.mainText}
        <div className="mt-md">
          <div>{page.followOnSocialMediaText}</div>
          <div className="mt-sm">
            <SocialMediaLinks socialMediaLinks={socialMediaLinks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainText;

const SocialMediaLinks = ({
  socialMediaLinks,
}: {
  socialMediaLinks: StaticData["orgDetails"]["socialMediaLinks"];
}) => (
  <div className="flex items-center gap-lg">
    {socialMediaLinks.facebook.length ? (
      <WithTooltip text="visit our facebook page">
        <a
          className="text-3xl"
          href={socialMediaLinks.facebook}
          target="_blank"
        >
          <Icon.Facebook color="#3b5998" />
        </a>
      </WithTooltip>
    ) : null}

    {socialMediaLinks.instagram.length ? (
      <WithTooltip text="visit our instagram page">
        <a
          className="text-3xl"
          href={socialMediaLinks.instagram}
          target="_blank"
        >
          <Icon.Instagram color="#833AB4" />
        </a>
      </WithTooltip>
    ) : null}

    {socialMediaLinks.linkedIn.length ? (
      <WithTooltip text="visit our linkedIn page">
        <a
          className="text-3xl"
          href={socialMediaLinks.linkedIn}
          target="_blank"
        >
          <Icon.Linkedin color="#0e76a8" />
        </a>
      </WithTooltip>
    ) : null}
  </div>
);
