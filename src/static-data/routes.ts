export const sectionIds = {
  about: {
    getInTouch: "get-in-touch",
  },
};

export const route = {
  landing: "/",
  about: "/about",
  getInTouch: `/about#${sectionIds.about.getInTouch}`,
  careers: "/careers",
  donate: "/donate",
  donate_success: "/donate-success",
  programmes: "/programmes",
  volunteer: "/volunteer",
  workshops: "/workshops",
  theoryOfChange: "/theory-of-change",
  testimonials: "/testimonials",
  message: "/about#message",
} as const;
