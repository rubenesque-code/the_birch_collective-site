import { processAboutPage } from "./about-page";
import { processCareer } from "./career";
import { processCareersPage } from "./careers-page";
import { processDonatePage } from "./donate-page";
import { processLandingPage } from "./landing-page";
import { processParticipantTestimonial } from "./participant-testimonial";
import { processPartner } from "./partner";
import { processProfessionalTestimonial } from "./professional-testimonial";
import { processProgramme } from "./programme";
import { processProgrammesPage } from "./programmes-page";
import { processSupporter } from "./supporter";
import { processTestimonialsPage } from "./testimonials-page";
import { processTheoryOfChangePage } from "./theory-of-change-page";
import { processVolunteerPage } from "./volunteer-page";
import { processVolunteerPosition } from "./volunteer-position";
import { processWorkshop } from "./workshop";
import { processWorkshopsPage } from "./workshops-page";

const processDbData = {
  career: processCareer,
  programme: processProgramme,
  partner: processPartner,
  supporter: processSupporter,
  participantTestimonial: processParticipantTestimonial,
  professionalTestimonial: processProfessionalTestimonial,
  volunteerPosition: processVolunteerPosition,
  workshop: processWorkshop,

  landingPage: processLandingPage,
  aboutPage: processAboutPage,
  careersPage: processCareersPage,
  donatePage: processDonatePage,
  programmesPage: processProgrammesPage,
  testimonialsPage: processTestimonialsPage,
  theoryOfChangePage: processTheoryOfChangePage,
  volunteerPage: processVolunteerPage,
  workshopsPage: processWorkshopsPage,
};

export default processDbData;
