import { processLandingPage } from "./landing-page";
import { processParticipantTestimonial } from "./participant-testimonial";
import { processPartner } from "./partner";
import { processProgramme } from "./programme";
import { processSupporter } from "./supporter";

const processDbData = {
  programme: processProgramme,
  partner: processPartner,
  supporter: processSupporter,
  participantTestimonial: processParticipantTestimonial,
  landingPage: processLandingPage,
};

export default processDbData;
