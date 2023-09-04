import { BannerImage, Head } from "~/components/sections";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import ParticipantTestimonials from "./participant-testimonials/+Entry";
import ProfessionalTestimonials from "./professional-testimonials/+Entry";

import { PageFrame } from "~/frames";

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

      <Ui.Page.VerticalSpace sizing="half" />

      <Ui.Page.HorizontalSpace>
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
    </PageFrame>
  );
};

export default TestimonialsPage;
