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

// OVERALL TO DO
// 1. do rest of this site apart from  donate, etc.
// 2. get sign up form running. Send data to google sheet. Notify by email.
// 3. add sign up email functionality to cms
// 4. populate cms
// 5. rest of this site
// 6. career download is working

// GO LIVE CHECKLIST
// □ get email codes from formsubmit email each member
// □ change formsubmit endpoints in formsubmit.ts

// COMMUNICATE TO TIM
// □ each member needs to activate formsubmit. Plus give me provided code.

// MUST DO
// □ download image/s button for posters
// □ click on poster to zoom
// □ programmes + workshops pages - go over lists design
// □ images background
// □ go over all pages + elements responsiveness
// □ donate functionality. inc donate-success page

// OTHER
// □ apply dompurify
// □ put get in touch form on each page? Yes, but collapsable?
// □ apply str fallbacks
// □ 404 page
// □ seo
// □ smooth scroll to section (with id)

// □ different max widths for text sections

// □ image blur in working? image load in bg
// □ bug on testimonials slider when hover central slide has transparency
// □ block phone number + email through other means
// □ no res returned from sheets post. Should really confirm receipt, and warn if not received. Is possible to do it properly?

const HomePage = ({ staticData }: { staticData: StaticData }) => {
  return (
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

      <Ui.Page.HorizontalSpace>
        <Headings
          heading={staticData.page.orgHeadings.name}
          subheading={staticData.page.orgHeadings.byline}
        />
      </Ui.Page.HorizontalSpace>

      {!staticData.participantTestimonials.length ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <ParticipantTestimonials
              data={staticData.participantTestimonials}
            />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      {staticData.page.aboutUs === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <AboutUs data={staticData.page.aboutUs} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      {staticData.page.workshops === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <Workshops data={staticData.page.workshops} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      {staticData.page.programmes === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <Programmes data={staticData.page.programmes} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      {staticData.page.photoAlbum === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <PhotoAlbum data={staticData.page.photoAlbum} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      {staticData.page.supportUs === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <SupportUs data={staticData.page.supportUs} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      {staticData.page.partners === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <Partners data={staticData.page.partners} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      {staticData.page.supporters === "not in use" ? null : (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <Supporters data={staticData.page.supporters} />
          </Ui.Page.HorizontalSpace>
        </>
      )}

      <Ui.Page.VerticalSpace />

      <Ui.Page.HorizontalSpace>
        <Footer
          footer={staticData.footer}
          linkLabels={staticData.linkLabels}
          logoImg={staticData.logoImage}
          orgDetails={staticData.orgDetails}
        />
      </Ui.Page.HorizontalSpace>

      <Ui.Page.VerticalSpace />
    </div>
  );
};

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
