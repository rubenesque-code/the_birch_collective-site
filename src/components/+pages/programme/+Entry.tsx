import Footer from "~/components/sections/footer/+Entry";
import Header from "~/components/sections/header";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import InfoAndPosters from "./info-and-posters/+Entry";
import PhotoAlbum from "./photo-album/+Entry";
import Sections from "./sections/+Entry";
import SignUp from "./sign-up/+Entry";

const ProgrammePage = ({
  staticData: { footer, header, linkLabels, logoImage, orgDetails, page },
}: {
  staticData: StaticData;
}) => {
  return (
    <div className="w-screen overflow-x-hidden">
      <Header
        staticData={{
          header: header,
          linkLabels: linkLabels,
          orgDetails: orgDetails,
          logoImg: logoImage,
        }}
      />

      {page.bannerImage === "not in use" ? null : (
        <Ui.Page.BannerImage data={page.bannerImage} />
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
            <Sections data={page.sections} />
          </Ui.Page.HorizontalSpace>
        </>
      ) : null}

      <Ui.Page.VerticalSpace double />

      <Ui.Page.HorizontalSpace>
        <Footer
          footer={footer}
          linkLabels={linkLabels}
          logoImg={logoImage}
          orgDetails={orgDetails}
        />
      </Ui.Page.HorizontalSpace>

      <Ui.Page.VerticalSpace />
    </div>
  );
};

export default ProgrammePage;
