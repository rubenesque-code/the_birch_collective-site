import crossProcess from "./cross-process";
import crossValidate from "./cross-validate";
import { processLandingPage } from "./landing-page";
import { processParticipantTestimonial } from "./participant-testimonial";
import { processPartner } from "./partner";
import { processProgramme } from "./programme";
import selfProcess from "./self-process";
import selfValidate from "./self-validate";
import { processSupporter } from "./supporter";

const processDbData = {
  selfValidate,
  crossValidate,
  selfProcess,
  crossProcess,
  programme: processProgramme,
  partner: processPartner,
  supporter: processSupporter,
  participantTestimonial: processParticipantTestimonial,
  landingPage: processLandingPage,
};

export default processDbData;
