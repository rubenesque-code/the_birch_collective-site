import {
  fetchAboutUsPage,
  fetchCareers,
  fetchCareersPage,
  fetchDonatePage,
  fetchFooter,
  fetchHeader,
  fetchImages,
  fetchLandingPage,
  fetchLinkLabels,
  fetchManyCareers,
  fetchManyImages,
  fetchManyPartners,
  fetchManyProgrammes,
  fetchManySupporters,
  fetchManyVolunteerPositions,
  fetchOneCareer,
  fetchOneImage,
  fetchOnePartner,
  fetchOneProgramme,
  fetchOneSupporter,
  fetchOneVolunteerPosition,
  fetchOneWorkshop,
  fetchOrgDetails,
  fetchParticipantTestimonials,
  fetchPartners,
  fetchProfessionalTestimonials,
  fetchProgrammes,
  fetchProgrammesPage,
  fetchSupporters,
  fetchTestimonialsPage,
  fetchTheoryOfChangePage,
  fetchVolunteerPositions,
  fetchVolunteerPositionsPage,
  fetchWorkshops,
  fetchWorkshopsPage,
} from "./query";

export const myDb = {
  pages: {
    landing: {
      fetch: fetchLandingPage,
    },
    testimonials: {
      fetch: fetchTestimonialsPage,
    },
    aboutUs: {
      fetch: fetchAboutUsPage,
    },
    "theory-of-change": {
      fetch: fetchTheoryOfChangePage,
    },
    programmes: {
      fetch: fetchProgrammesPage,
    },
    donate: {
      fetch: fetchDonatePage,
    },
    ["volunteer-positions"]: {
      fetch: fetchVolunteerPositionsPage,
    },
    career: {
      fetch: fetchCareersPage,
    },
    workshops: {
      fetch: fetchWorkshopsPage,
    },
  },

  orgDetails: {
    fetch: fetchOrgDetails,
  },
  linkLabels: {
    fetch: fetchLinkLabels,
  },
  header: {
    fetch: fetchHeader,
  },
  footer: {
    fetch: fetchFooter,
  },
  image: {
    fetchOne: fetchOneImage,
    fetchMany: fetchManyImages,
    fetchAll: fetchImages,
  },
  "participant-testimonial": {
    fetchAll: fetchParticipantTestimonials,
  },
  "professional-testimonial": {
    fetchAll: fetchProfessionalTestimonials,
  },
  programme: {
    fetchOne: fetchOneProgramme,
    fetchMany: fetchManyProgrammes,
    fetchAll: fetchProgrammes,
  },
  supporter: {
    fetchOne: fetchOneSupporter,
    fetchMany: fetchManySupporters,
    fetchAll: fetchSupporters,
  },
  partner: {
    fetchOne: fetchOnePartner,
    fetchMany: fetchManyPartners,
    fetchAll: fetchPartners,
  },
  ["volunteer-positions"]: {
    fetchOne: fetchOneVolunteerPosition,
    fetchMany: fetchManyVolunteerPositions,
    fetchAll: fetchVolunteerPositions,
  },
  career: {
    fetchOne: fetchOneCareer,
    fetchMany: fetchManyCareers,
    fetchAll: fetchCareers,
  },

  workshop: {
    fetchOne: fetchOneWorkshop,
    fetchAll: fetchWorkshops,
  },
};
