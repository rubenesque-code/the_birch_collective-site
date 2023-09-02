import { BannerImage } from "~/components/sections/BannerImage";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import JobPosts from "./job-posts/+Entry";
import MainText from "./main-text/+Entry";

import { PageFrame } from "~/frames";

const CareersPage = ({
  staticData: { footer, header, linkLabels, logoImage, orgDetails, page },
}: {
  staticData: StaticData;
}) => {
  return (
    <PageFrame
      footer={footer}
      header={header}
      linkLabels={linkLabels}
      logoImage={logoImage}
      orgDetails={orgDetails}
    >
      {page.bannerImage === "not in use" ? null : (
        <BannerImage data={page.bannerImage} />
      )}

      <Ui.Page.HorizontalSpace>
        <Ui.Section.VerticalSpace />

        <Ui.Page.Heading className="text-brandGreen">
          {page.heading}
        </Ui.Page.Heading>
      </Ui.Page.HorizontalSpace>

      <Ui.Page.HorizontalSpace>
        <Ui.Section.VerticalSpace />

        <MainText page={page} socialMediaLinks={orgDetails.socialMediaLinks} />
      </Ui.Page.HorizontalSpace>

      {page.careers === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <JobPosts {...page.careers} />
          </Ui.Page.HorizontalSpace>
        </>
      )}
    </PageFrame>
  );
};

export default CareersPage;
