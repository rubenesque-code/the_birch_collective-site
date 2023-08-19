import Markdown from "markdown-to-jsx";

import SiteLayout from "~/components/layouts/Site";
import Header from "~/components/sections/header";
import { StorageImage } from "~/components/StorageImage";

import { type StaticData } from "./_static-data";
import AboutUs from "./about-us/+Entry";
import ParticipantTestimonials from "./participant-testimonials/+Entry";

// □ get form up and running

// □ apply dompurify

// □ different max widths for text sections

// □ image blur in working? image load in bg
// □ bug on testimonials slider when hover central slide has transparency

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

      {!staticData.page.bannerImage ? null : (
        <BannerImage data={staticData.page.bannerImage} />
      )}

      <SiteLayout.Section.Spacing.Vertical />

      <SiteLayout.Section.Spacing.Horizontal>
        <Headings
          heading={staticData.page.orgHeadings.name}
          subheading={staticData.page.orgHeadings.byline}
        />
      </SiteLayout.Section.Spacing.Horizontal>

      <SiteLayout.Section.Spacing.Vertical />

      <SiteLayout.Section.Spacing.Horizontal>
        <ParticipantTestimonials
          staticData={{
            testimonials: staticData.participantTestimonials,
          }}
        />
      </SiteLayout.Section.Spacing.Horizontal>

      {staticData.page.aboutUs ? (
        <>
          <SiteLayout.Section.Spacing.Vertical />

          <SiteLayout.Section.Spacing.Horizontal>
            <AboutUs staticData={staticData.page.aboutUs} />
          </SiteLayout.Section.Spacing.Horizontal>
        </>
      ) : null}
    </div>
  );
};

export default HomePage;

const BannerImage = ({
  data,
}: {
  data: NonNullable<StaticData["page"]["bannerImage"]>;
}) => {
  return (
    <div className="group/bannerImage relative aspect-[16/9] overflow-hidden xl:aspect-[14/3]">
      <StorageImage urls={data.connectedImage.urls} position={data.position} />
    </div>
  );
};

const Headings = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  return (
    <div className=" bg-[url('/images/icon-bg.png')] bg-cover bg-clip-text bg-center text-center text-transparent">
      <h1 className=" font-display text-5xl font-bold tracking-wider xs:text-7xl md:text-8xl">
        {heading}
      </h1>
      <h2 className="mt-4 text-base uppercase tracking-wide xs:text-xl sm:text-2xl md:mt-8 md:text-3xl lg:text-4xl">
        <Markdown>{subheading}</Markdown>
      </h2>
    </div>
  );
};
