import { BannerImage, Head, RichSections } from "~/components/sections";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";

import { PageFrame } from "~/frames";

const TestimonialsPage = ({
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
        {page.sections.length ? (
          <RichSections data={page.sections} />
        ) : (
          <p>Check back later...</p>
        )}
      </Ui.Page.HorizontalSpace>
    </PageFrame>
  );
};

export default TestimonialsPage;
