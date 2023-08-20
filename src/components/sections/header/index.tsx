import React from "react";
import Link from "next/link";
import { useClickOutside } from "@react-hookz/web";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";

import type { MyDb } from "~/types/database";

type Props = {
  staticData: {
    header: MyDb["singles"]["header"];
    linkLabels: MyDb["singles"]["linkLabels"];
    orgDetails: MyDb["singles"]["orgDetails"];
    logoImg: MyDb["image"] | null;
  };
};

const Header = (props: Props) => <Expanded {...props} />;

export default Header;

const Expanded = ({ staticData }: Props) => {
  return (
    <div className="z-50 hidden w-screen items-center justify-between bg-white px-4 py-6 md:flex lg:px-8 2xl:px-12">
      <Link href="/" passHref>
        <div className="flex cursor-pointer items-center gap-2">
          {staticData.logoImg ? (
            <div className="relative aspect-[1/1] w-[70px]">
              <StorageImage urls={staticData.logoImg.urls} />
            </div>
          ) : null}

          <h3 className="font-display text-3xl font-bold tracking-wider text-display lg:text-4xl xl:text-6xl">
            {staticData.orgDetails.name}
          </h3>
        </div>
      </Link>

      <div className="flex  items-center justify-between gap-3 lg:gap-6">
        <Menu
          buttonLabel={staticData.linkLabels.aboutUs}
          xOrigin="center"
          tagline={staticData.header.aboutUs.popover.subheading}
          title={staticData.header.aboutUs.popover.heading}
        >
          <MenuItem route="/about" label={staticData.linkLabels.aboutUs} />
          <MenuItem
            route="/about#meet-the-team"
            label={staticData.linkLabels.meetTheTeam}
          />
          <MenuItem
            route="/about#get-in-touch"
            label={staticData.linkLabels.getInTouch}
          />
          <MenuItem
            route="/theory-of-change"
            label={staticData.linkLabels.theoryOfChange}
          />
          <MenuItem
            route="/testimonials"
            label={staticData.linkLabels.testimonials}
          />
        </Menu>

        <Link href="/programmes" passHref>
          <div>
            <ExpandedNavbarLinkLabel>
              {staticData.linkLabels.programmes}
            </ExpandedNavbarLinkLabel>
          </div>
        </Link>

        <Menu
          buttonLabel={staticData.linkLabels.getInvolved}
          xOrigin="right"
          tagline={staticData.header.getInvolved.popover.subheading}
          title={staticData.header.getInvolved.popover.heading}
        >
          <MenuItem route="/donate" label={staticData.linkLabels.donate} />
          <MenuItem
            route="/volunteer"
            label={staticData.linkLabels.volunteer}
          />
          <MenuItem route="/careers" label={staticData.linkLabels.careers} />
        </Menu>

        <Link href="/workshops" passHref>
          <div>
            <ExpandedNavbarLinkLabel>
              {staticData.linkLabels.workshops}
            </ExpandedNavbarLinkLabel>
          </div>
        </Link>
      </div>
    </div>
  );
};

const Menu = ({
  buttonLabel,
  children,
  title,
  tagline,
  xOrigin,
}: {
  buttonLabel: string;
  title: string;
  tagline: string;
  children: React.ReactElement[];
  xOrigin: "center" | "right";
}) => {
  const [show, setShow] = React.useState(false);

  const ref = React.useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setShow(false));

  return (
    <div className="relative z-50" ref={ref}>
      <button
        onClick={() => setShow(!show)}
        type="button"
        className="flex items-center gap-1 lg:gap-2"
      >
        <ExpandedNavbarLinkLabel>{buttonLabel}</ExpandedNavbarLinkLabel>
        <span className="text-brandGreen">
          <Icon.CaretDown weight="bold" />
        </span>
      </button>

      <div
        className={`absolute translate-y-5 transition-all ease-in-out ${
          show
            ? "visible scale-100 opacity-100"
            : "invisible scale-90 opacity-0"
        } ${
          xOrigin === "center"
            ? "origin-top -translate-x-1/2"
            : "right-0 origin-top-right"
        } rounded-sm border border-t bg-white px-10 py-8 shadow-lg lg:px-14 lg:py-10`}
      >
        <h3 className="font-display text-4xl font-bold tracking-wide text-displayGreen">
          {title}
        </h3>
        <p className="mt-2 text-lg">{tagline}</p>
        <div className="gap mt-4 flex w-[80vw] max-w-[650px] flex-wrap gap-lg gap-y-sm uppercase">
          {children}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ route, label }: { route: string; label: string }) => (
  <Link href={route} passHref>
    <div className="z-50 flex cursor-pointer items-center gap-1 px-3 py-1 hover:bg-gray-100">
      <span className="grid place-items-center text-displayGreen">
        <Icon.CaretRight size={22} weight="bold" />
      </span>
      <span className="whitespace-nowrap text-lg tracking-wide">{label}</span>
    </div>
  </Link>
);

const ExpandedNavbarLinkLabel = ({
  children,
}: {
  children: string | React.ReactElement;
}) => {
  return (
    <h3 className="cursor-pointer text-sm font-semibold uppercase tracking-wide lg:text-base xl:text-lg">
      {children}
    </h3>
  );
};
