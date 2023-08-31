import Footer from "~/components/sections/footer/+Entry";
import Header from "~/components/sections/header";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import GetInTouch from "./get-in-touch/+Entry";
import TheTeam from "./the-team/+Entry";

const AboutPage = ({
  staticData: { footer, header, linkLabels, logoImage, orgDetails, page },
}: {
  staticData: StaticData;
}) => {
  console.log("page:", page);
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
          <Ui.Page.VerticalSpace double />

          <Ui.Page.HorizontalSpace>
            <TheTeam {...page.theTeam} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      <Ui.Page.VerticalSpace double />

      <Ui.Page.HorizontalSpace>
        <GetInTouch orgDetails={orgDetails} />
      </Ui.Page.HorizontalSpace>

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

export default AboutPage;
