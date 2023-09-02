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
  // · -mb-[1.25em] to account for that on prose
  <div
    className={`-mb-[1.25em] mt-3 flex justify-center xs:mt-4 sm:mt-6 ${
      className || ""
    }`}
  >
    <div className="custom-prose prose max-w-[60ch] text-center font-light text-gray-900 xs:text-lg sm:text-xl ">
      <Markdown>{children}</Markdown>
    </div>
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

const Text = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <div className={`custom-prose prose ${className || ""}`}>
    <Markdown>{children}</Markdown>
  </div>
);

Section.Text = Text;

const TextMaxWidth = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => <div className={`max-w-[65ch] ${className || ""}`}>{children}</div>;

Text.MaxWidth = TextMaxWidth;
