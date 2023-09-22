import Markdown from "markdown-to-jsx";

import { BannerImage, Head } from "~/components/sections";
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

// GO LIVE CHECKLIST
// □ get email codes from formsubmit email each member
// □ change formsubmit endpoints in formsubmit.ts (use codes rather than emails)
// □ env values in cms and frontend - will probably change to vercel project that has the domain setup so will have to change env values!!

// COMMUNICATE TO TIM

// MUST DO

// TO DO
// □ update nextjs package - image now working?
// □ image component
// □ navbar translate bug on mobile - seems to happen twice. Could be to do with calculation of when to hide + translation of scroll element.
// □ supporters needs work. logo images too low res. too large. bottom row needs be centered.
// □ format donation amount for currency; go over donation amount logic and assertions.
// □ should be a poster max size. Looks silly on big screens

// OTHER
// □ pagespeed.web.dev suggestions
// □ use image linter extension
// □ head - title for pages
// □ apply dompurify
// □ image blur up. See issue (https://github.com/vercel/next.js/issues/42140)
// □ go over rest of storage images and apply 'sizes'. Got up to programme page. (working through how pages appear in header)
// □ probs should process singles e.g. social media links might not be in use
// □ put get in touch form on each page? Yes, but collapsable?
// □ 404 page
// □ smooth scroll to section (with id)
// □ should store sign up form entries when click away and between pages.
// □ better external link functionality on touch-screen is: click once -> tooltip show saying 'click again to go to page' -> ...
// □ different max widths for text sections
// □ block phone number + email through other means?
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
    <h1 className="font-display text-5xl font-bold tracking-wider xs:text-7xl md:text-8xl">
      {heading}
    </h1>
    <h2 className="mt-4 text-base uppercase tracking-wide xs:text-xl sm:text-2xl md:mt-8 md:text-3xl lg:text-4xl">
      <Markdown>{subheading}</Markdown>
    </h2>
  </div>
);
