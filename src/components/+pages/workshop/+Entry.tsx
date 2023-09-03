import { BannerImage } from "~/components/sections/BannerImage";
import RichSections from "~/components/sections/rich-sections/+Entry";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import InfoAndPhotoAlbum from "./info-and-photo-album/+Entry";
import SignUp from "./sign-up/+Entry";
import Tickets from "./tickets/+Entry";

import { PageFrame } from "~/frames";

const WorkshopPage = ({
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
          <BannerImage data={page.bannerImage} />

          <Ui.Page.VerticalSpace sizing="half" />
        </>
      )}

      <Ui.Page.HorizontalSpace>
        {page.subtitle.length ? (
          <Ui.Page.Subheading>{page.subtitle}</Ui.Page.Subheading>
        ) : null}

        <Ui.Page.Heading className="text-brandGreen">
          {page.title}
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
        {page.type === "paid" && page.tickets !== "not in use" ? (
          <Tickets {...page.tickets} />
        ) : (
          <SignUp {...page.signUp} title={page.title} />
        )}
      </Ui.Page.HorizontalSpace>

      {page.info === "not in use" && page.photoAlbum === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <InfoAndPhotoAlbum info={page.info} photoAlbum={page.photoAlbum} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      {page.sections.length ? (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <RichSections data={page.sections} />
          </Ui.Page.HorizontalSpace>
        </>
      ) : null}
    </PageFrame>
  );
};

export default WorkshopPage;
