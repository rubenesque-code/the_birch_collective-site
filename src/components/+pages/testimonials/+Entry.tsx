import Footer from "~/components/sections/footer/+Entry";
import Header from "~/components/sections/header";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import ParticipantTestimonials from "./participant-testimonials/+Entry";
import ProfessionalTestimonials from "./professional-testimonials/+Entry";

const TestimonialsPage = ({
  staticData: {
    footer,
    header,
    linkLabels,
    logoImage,
    orgDetails,
    page,
    participantTestimonials,
    professionalTestimonials,
  },
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

      {professionalTestimonials.length ? (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <ProfessionalTestimonials
              pageData={page.professionals}
              testimonials={professionalTestimonials}
            />
          </Ui.Page.HorizontalSpace>
        </>
      ) : null}

      {participantTestimonials.length ? (
        <>
          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <ParticipantTestimonials
              pageData={page.participants}
              testimonials={participantTestimonials}
            />
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

export default TestimonialsPage;
