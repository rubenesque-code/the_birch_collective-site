import Markdown from "markdown-to-jsx";

function Section() {
  throw new Error(
    "Section exists for naming purposes only and should not be used as a component",
  );
}

export default Section;

const Heading = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <h3
    className={`text-center font-display text-5xl font-bold tracking-wide md:text-7xl ${
      className || ""
    }`}
  >
    <Markdown>{children}</Markdown>
  </h3>
);

Section.Heading = Heading;

const Subheading = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <div
    className={`mt-3 text-center font-light xs:mt-4 xs:text-lg sm:mt-6 sm:text-xl lg:text-2xl ${
      className || ""
    }`}
  >
    <Markdown>{children}</Markdown>
  </div>
);

Section.Subheading = Subheading;

const VerticalSpace = () => <div className="mt-6 xs:mt-8 sm:mt-10 md:mt-12" />;

Section.VerticalSpace = VerticalSpace;

const Description = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <div className={`custom-prose prose w-full max-w-full ${className || ""}`}>
    <Markdown>{children}</Markdown>
  </div>
);

Section.Description = Description;
