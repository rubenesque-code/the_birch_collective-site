import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import Opportunities from "./opportunites/+Entry";

import { PageFrame } from "~/frames";

const VolunteerPage = ({
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
      {page.bannerImage === "not in use" ? (
        <Ui.Page.VerticalSpace sizing="half" />
      ) : (
        <>
          <Ui.Page.BannerImage data={page.bannerImage} />

          <Ui.Page.VerticalSpace sizing="half" />
        </>
      )}

      <Ui.Page.HorizontalSpace>
        <Ui.Page.Heading className="text-brandGreen">
          {page.heading}
        </Ui.Page.Heading>
      </Ui.Page.HorizontalSpace>

      {page.mainText.length ? (
        <>
          <Ui.Page.HorizontalSpace>
            <Ui.Section.VerticalSpace />

            <Ui.Page.MainText>{page.mainText}</Ui.Page.MainText>
          </Ui.Page.HorizontalSpace>
        </>
      ) : null}

      <Ui.Page.VerticalSpace />

      <Ui.Page.HorizontalSpace>
        <Opportunities {...page.opportunities} />
      </Ui.Page.HorizontalSpace>
    </PageFrame>
  );
};

export default VolunteerPage;
