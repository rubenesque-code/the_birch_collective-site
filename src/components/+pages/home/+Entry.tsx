import Markdown from "markdown-to-jsx";

import { BannerImage } from "~/components/sections/BannerImage";
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

import { PageFrame } from "~/frames";

// OVERALL TO DO
// 1. do rest of this site apart from  donate, etc.
// 2. rest of this site
// 2. add keyword image search to image
// 3. career download is working

// GO LIVE CHECKLIST
// □ get email codes from formsubmit email each member
// □ change formsubmit endpoints in formsubmit.ts
// □ env values
// □ put footer back

// COMMUNICATE TO TIM
// □ each member needs to activate formsubmit. Plus give me provided code.

// MUST DO
// □ landing banner image info popover
// □ not putting placeholder data in cms so go over with local data too. e.g. for professional testimonials.

// □ go over all pages + elements responsiveness
// □ donate functionality. inc donate-success page

// OTHER
// □ apply dompurify
// □ headings subheading abstraction
// □ probs should process singles e.g. social media links might not be in use
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

const HomePage = ({
  footer,
  header,
  linkLabels,
  logoImage,
  orgDetails,
  page,
  participantTestimonials,
}: StaticData) => {
  return (
    <>
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

        <Ui.Page.VerticalSpace />

        <Ui.Page.HorizontalSpace>
          <Headings
            heading={page.orgHeadings.name}
            subheading={page.orgHeadings.byline}
          />
        </Ui.Page.HorizontalSpace>

        {!participantTestimonials.length ? null : (
          <>
            <Ui.Page.VerticalSpace />

            <Ui.Page.HorizontalSpace>
              <ParticipantTestimonials data={participantTestimonials} />
            </Ui.Page.HorizontalSpace>
          </>
        )}

        {page.aboutUs === "not in use" ? null : (
          <>
            <Ui.Page.VerticalSpace />

            <Ui.Page.HorizontalSpace>
              <AboutUs data={page.aboutUs} />
            </Ui.Page.HorizontalSpace>
          </>
        )}

        {page.workshops === "not in use" ? null : (
          <>
            <Ui.Page.VerticalSpace />

            <Ui.Page.HorizontalSpace>
              <Workshops data={page.workshops} />
            </Ui.Page.HorizontalSpace>
          </>
        )}

        {page.programmes === "not in use" ? null : (
          <>
            <Ui.Page.VerticalSpace />

            <Ui.Page.HorizontalSpace>
              <Programmes data={page.programmes} />
            </Ui.Page.HorizontalSpace>
          </>
        )}

        {page.photoAlbum === "not in use" ? null : (
          <>
            <Ui.Page.VerticalSpace />

            <Ui.Page.HorizontalSpace>
              <PhotoAlbum data={page.photoAlbum} />
            </Ui.Page.HorizontalSpace>
          </>
        )}

        {page.supportUs === "not in use" ? null : (
          <>
            <Ui.Page.VerticalSpace />

            <Ui.Page.HorizontalSpace>
              <SupportUs data={page.supportUs} />
            </Ui.Page.HorizontalSpace>
          </>
        )}

        {page.partners === "not in use" ? null : (
          <>
            <Ui.Page.VerticalSpace />

            <Ui.Page.HorizontalSpace>
              <Partners data={page.partners} />
            </Ui.Page.HorizontalSpace>
          </>
        )}

        {page.supporters === "not in use" ? null : (
          <>
            <Ui.Page.VerticalSpace />

            <Ui.Page.HorizontalSpace>
              <Supporters data={page.supporters} />
            </Ui.Page.HorizontalSpace>
          </>
        )}
      </PageFrame>
    </>
  );
};

export default HomePage;

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
