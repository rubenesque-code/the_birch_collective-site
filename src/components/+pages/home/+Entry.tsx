import Markdown from "markdown-to-jsx";

import Footer from "~/components/sections/footer/+Entry";
import Header from "~/components/sections/header";
import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import AboutUs from "./about-us/+Entry";
import ParticipantTestimonials from "./participant-testimonials/+Entry";
import Partners from "./partners/+Entry";
import PhotoAlbum from "./photo-album/+Entry";
import Programmes from "./programmes";
import SupportUs from "./support-us/+Entry";
import Supporters from "./supporters/+Entry";
import Workshops from "./workshops/+Entry";

import type { MyExclude } from "~/types/utilities";

// □ get form up and running

// □ apply dompurify

// □ different max widths for text sections

// □ image blur in working? image load in bg
// □ bug on testimonials slider when hover central slide has transparency
// □ block phone number + email through other means

const HomePage = ({ staticData }: { staticData: StaticData }) => (
  <div className="w-screen overflow-x-hidden">
    <Header
      staticData={{
        header: staticData.header,
        linkLabels: staticData.linkLabels,
        orgDetails: staticData.orgDetails,
        logoImg: staticData.logoImage,
      }}
    />

    {staticData.page.bannerImage === "not in use" ? null : (
      <BannerImage data={staticData.page.bannerImage} />
    )}

    <Ui.Page.VerticalSpace />

    <Ui.Page.SectionHorizontalSpacing>
      <Headings
        heading={staticData.page.orgHeadings.name}
        subheading={staticData.page.orgHeadings.byline}
      />
    </Ui.Page.SectionHorizontalSpacing>

    {!staticData.participantTestimonials.length ? null : (
      <>
        <Ui.Page.VerticalSpace />

        <Ui.Page.SectionHorizontalSpacing>
          <ParticipantTestimonials data={staticData.participantTestimonials} />
        </Ui.Page.SectionHorizontalSpacing>
      </>
    )}

    {staticData.page.aboutUs === "not in use" ? null : (
      <>
        <Ui.Page.VerticalSpace />

        <Ui.Page.SectionHorizontalSpacing>
          <AboutUs data={staticData.page.aboutUs} />
        </Ui.Page.SectionHorizontalSpacing>
      </>
    )}

    {staticData.page.workshops === "not in use" ? null : (
      <>
        <Ui.Page.VerticalSpace />

        <Ui.Page.SectionHorizontalSpacing>
          <Workshops data={staticData.page.workshops} />
        </Ui.Page.SectionHorizontalSpacing>
      </>
    )}

    {staticData.page.programmes === "not in use" ? null : (
      <>
        <Ui.Page.VerticalSpace />

        <Ui.Page.SectionHorizontalSpacing>
          <Programmes data={staticData.page.programmes} />
        </Ui.Page.SectionHorizontalSpacing>
      </>
    )}

    {staticData.page.photoAlbum === "not in use" ? null : (
      <>
        <Ui.Page.VerticalSpace />

        <Ui.Page.SectionHorizontalSpacing>
          <PhotoAlbum data={staticData.page.photoAlbum} />
        </Ui.Page.SectionHorizontalSpacing>
      </>
    )}

    {staticData.page.supportUs === "not in use" ? null : (
      <>
        <Ui.Page.VerticalSpace />

        <Ui.Page.SectionHorizontalSpacing>
          <SupportUs data={staticData.page.supportUs} />
        </Ui.Page.SectionHorizontalSpacing>
      </>
    )}

    {staticData.page.partners === "not in use" ? null : (
      <>
        <Ui.Page.VerticalSpace />

        <Ui.Page.SectionHorizontalSpacing>
          <Partners data={staticData.page.partners} />
        </Ui.Page.SectionHorizontalSpacing>
      </>
    )}

    {staticData.page.supporters === "not in use" ? null : (
      <>
        <Ui.Page.VerticalSpace />

        <Ui.Page.SectionHorizontalSpacing>
          <Supporters data={staticData.page.supporters} />
        </Ui.Page.SectionHorizontalSpacing>
      </>
    )}

    <Ui.Page.VerticalSpace />

    <Ui.Page.SectionHorizontalSpacing>
      <Footer
        footer={staticData.footer}
        linkLabels={staticData.linkLabels}
        logoImg={staticData.logoImage}
        orgDetails={staticData.orgDetails}
      />
    </Ui.Page.SectionHorizontalSpacing>

    <Ui.Page.VerticalSpace />
  </div>
);

export default HomePage;

const BannerImage = ({
  data,
}: {
  data: MyExclude<StaticData["page"]["bannerImage"], "not in use">;
}) => (
  <div className="group/bannerImage relative aspect-[16/9] overflow-hidden xl:aspect-[14/3]">
    <StorageImage urls={data.connectedImage.urls} position={data.position} />
  </div>
);

const Headings = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => (
  <div className=" bg-[url('/images/icon-bg.png')] bg-cover bg-clip-text bg-center text-center text-transparent">
    <h1 className=" font-display text-5xl font-bold tracking-wider xs:text-7xl md:text-8xl">
      {heading}
    </h1>
    <h2 className="mt-4 text-base uppercase tracking-wide xs:text-xl sm:text-2xl md:mt-8 md:text-3xl lg:text-4xl">
      <Markdown>{subheading}</Markdown>
    </h2>
  </div>
);
