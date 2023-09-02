import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import Sections from "./sections/+Entry";

import { PageFrame } from "~/frames";

const TestimonialsPage = ({
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
        <Ui.Page.BannerImage data={page.bannerImage} />
      )}

      <Ui.Page.HorizontalSpace>
        <Ui.Section.VerticalSpace />
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

      {page.sections.length ? (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <Sections data={page.sections} />
          </Ui.Page.HorizontalSpace>
        </>
      ) : null}
    </PageFrame>
  );
};

export default TestimonialsPage;
