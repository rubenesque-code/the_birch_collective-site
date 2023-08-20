import React from "react";
import Markdown from "markdown-to-jsx";

function Page() {
  throw new Error(
    "Section exists for naming purposes only and should not be used as a component",
  );
}

export default Page;

const Heading = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <h1
    className={`font-display text-5xl font-bold tracking-wider xs:text-7xl md:text-8xl ${
      className || ""
    }`}
  >
    <Markdown>{children}</Markdown>
  </h1>
);

Page.Heading = Heading;

const Subheading = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <div
    className={`text-base uppercase tracking-wide xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl ${
      className || ""
    }`}
  >
    <Markdown>{children}</Markdown>
  </div>
);

Page.Subheading = Subheading;

const VerticalSpace = () => <div className="mt-8 xs:mt-16 lg:mt-24" />;

Page.VerticalSpace = VerticalSpace;

const SectionHorizontalSpacing = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="grid place-items-center">
    <div className="w-screen max-w-[1600px] px-4 xs:px-8 sm:px-12 md:px-16 lg:px-24">
      {children}
    </div>
  </div>
);

Page.SectionHorizontalSpacing = SectionHorizontalSpacing;
