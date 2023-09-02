import { BannerImage } from "~/components/sections/BannerImage";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import ProgrammesList from "./programmes-list/+Entry";

import { PageFrame } from "~/frames";

const ProgrammePage = ({
  staticData: {
    footer,
    header,
    linkLabels,
    logoImage,
    orgDetails,
    page,
    programmes,
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

      {programmes.length ? (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <ProgrammesList data={programmes} />
          </Ui.Page.HorizontalSpace>
        </>
      ) : (
        <p>No programmes listed at the moment. Check back later.</p>
      )}
    </PageFrame>
  );
};

export default ProgrammePage;
