import { BannerImage, Head } from "~/components/sections";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import GetInTouch from "./get-in-touch/+Entry";
import TheTeam from "./the-team/+Entry";

import { PageFrame } from "~/frames";

const AboutPage = ({
  staticData: { footer, header, linkLabels, logoImage, orgDetails, page },
}: {
  staticData: StaticData;
}) => {
  return (
    <PageFrame
      head={<Head />}
      footer={footer}
      header={header}
      linkLabels={linkLabels}
      logoImage={logoImage}
      orgDetails={orgDetails}
    >
      {page.bannerImage === "not in use" ? null : (
        <BannerImage data={page.bannerImage} />
      )}

      <Ui.Page.VerticalSpace sizing="half" />

      <Ui.Page.HorizontalSpace>
        <Ui.Page.Subheading>{page.subheading}</Ui.Page.Subheading>

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

      {page.theTeam === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <TheTeam {...page.theTeam} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      <Ui.Page.VerticalSpace />

      <Ui.Page.HorizontalSpace>
        <GetInTouch orgDetails={orgDetails} />
      </Ui.Page.HorizontalSpace>
    </PageFrame>
  );
};

export default AboutPage;
