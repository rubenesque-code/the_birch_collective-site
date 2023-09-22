import { Head } from "~/components/sections";
import { BannerImage } from "~/components/sections/BannerImage";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import MainText from "./main-text/+Entry";
import WorkshopsList from "./workshops-list/+Entry";

import { PageFrame } from "~/frames";

const WorkshopsPage = ({
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

      <Ui.Page.HorizontalSpace className="!max-w-[1400px]">
        <Ui.Page.VerticalSpace sizing="half" />

        <Ui.Page.Heading className="text-brandGreen">
          {page.heading}
        </Ui.Page.Heading>
      </Ui.Page.HorizontalSpace>

      {page.mainText.length ? (
        <>
          <Ui.Page.HorizontalSpace className="!max-w-[1400px]">
            <Ui.Section.VerticalSpace />

            <MainText aboutAmy={page.aboutAmy} mainText={page.mainText} />
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

export default WorkshopsPage;
