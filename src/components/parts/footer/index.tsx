import Link from "next/link";

import { EditableLabels, MyPick } from "~/types/database";

type Props = {
  siteLinkLabels: MyPick<
    EditableLabels["sections"],
    "about" | "donate" | "programmes" | "volunteer" | "workshops"
  >;
};

const Footer = ({ siteLinkLabels }: Props) => {
  return (
    <footer test-id="footer">
      <div>
        <Link href={"/programmes"} test-id="programmes">
          {siteLinkLabels.programmes}
        </Link>
        <Link href={"/workshops"} test-id="workshops">
          {siteLinkLabels.workshops}
        </Link>
        <Link href={"/donate"} test-id="donate">
          {siteLinkLabels.donate}
        </Link>
        <Link href={"/volunteer"} test-id="volunteer">
          {siteLinkLabels.volunteer}
        </Link>
        <Link href={"/about-us"} test-id="about-us">
          {siteLinkLabels.about}
        </Link>
      </div>
      <div>
        <a href={""} test-id="facebook">
          facebook
        </a>
      </div>
    </footer>
  );
};

export { Footer, type Props as FooterProps };
