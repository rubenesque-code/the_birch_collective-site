import type { ReactNode } from "react";

function SiteLayout() {
  throw new Error(
    "PageSectionLayout exists for naming purposes only and should not be used as a component",
  );
}

export default SiteLayout;

const SectionHorizontalSpacing = ({ children }: { children: ReactNode }) => (
  <div className="grid place-items-center">
    <div className="w-screen max-w-[1600px] px-4 xs:px-8 sm:px-12 md:px-16 lg:px-24">
      {children}
    </div>
  </div>
);

const SectionVerticalSpacing = () => <div className="py-4 xs:py-8 lg:py-12" />;

const Section = () => {
  throw new Error(
    "PageLayout.Section exists for naming purposes only and should not be used as a component",
  );
};

SiteLayout.Section = Section;

const Spacing = () => {
  throw new Error(
    "PageLayout.Section.Spacing exists for naming purposes only and should not be used as a component",
  );
};

Section.Spacing = Spacing;

Spacing.Horizontal = SectionHorizontalSpacing;
Spacing.Vertical = SectionVerticalSpacing;
