import { BannerImage, Head, RichSections } from "~/components/sections";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import CampBirchOnly from "./camp-birch-only/+Entry";
import InfoAndPosters from "./info-and-posters/+Entry";
import PhotoAlbum from "./photo-album/+Entry";
import SignUp from "./sign-up/+Entry";

import { PageFrame } from "~/frames";
import { isDevMode } from "~/static-data/process";

const campBirchId = isDevMode
  ? "c1a225b3-71bf-4dd4-822e-e6e5905331f5"
  : "7913c51a-9f94-4cfd-b2cb-0184d51aaa38";

const ProgrammePage = ({
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

      <Ui.Page.HorizontalSpace>
        <Ui.Section.VerticalSpace />
        <Ui.Page.Subheading>{page.subtitle}</Ui.Page.Subheading>
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
        <SignUp {...page.signUp} title={page.title} />
      </Ui.Page.HorizontalSpace>

      {page.info === "not in use" && page.posters === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <InfoAndPosters
              info={page.info}
              posters={page.posters}
              programmeTitle={page.title}
            />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      {page.photoAlbum === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <PhotoAlbum {...page.photoAlbum} />
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

      {page.id === campBirchId ? (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <CampBirchOnly />
          </Ui.Page.HorizontalSpace>
        </>
      ) : null}
    </PageFrame>
  );
};

export default ProgrammePage;
