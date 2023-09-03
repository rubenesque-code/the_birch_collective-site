export const sectionIds = {
  about: {
    getInTouch: "get-in-touch",
    meetTheTeam: "meet-the-team",
  },
};

export const route = {
  landing: "/",
  about: "/about",
  getInTouch: `/about#${sectionIds.about.getInTouch}`,
  meetTheTeam: `/about#${sectionIds.about.meetTheTeam}`,
  careers: "/careers",
  donate: "/donate",
  donate_success: "/donate-success",
  programmes: "/programmes",
  volunteer: "/volunteer",
  workshops: "/workshops",
  theoryOfChange: "/theory-of-change",
  testimonials: "/testimonials",
} as const;
