import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import WorkshopsList from "./workshops-list/+Entry";

import { PageFrame } from "~/frames";

const ProgrammePage = ({
  staticData: {
    footer,
    header,
    linkLabels,
    logoImage,
    orgDetails,
    page,
    workshops,
  },
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
        <Ui.Page.VerticalSpace sizing="half" />

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

      {workshops.length ? (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <WorkshopsList data={workshops} />
          </Ui.Page.HorizontalSpace>
        </>
      ) : (
        <p>No workshops listed at the moment. Check back later.</p>
      )}
    </PageFrame>
  );
};

export default ProgrammePage;
