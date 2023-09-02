import React from "react";
import Link from "next/link";
import { useClickOutside } from "@react-hookz/web";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";

import { route } from "~/static-data/routes";
import type { MyDb } from "~/types/database";

type Props = {
  staticData: {
    header: MyDb["singles"]["header"];
    linkLabels: MyDb["singles"]["linkLabels"];
    orgDetails: MyDb["singles"]["orgDetails"];
    logoImg: MyDb["image"] | null;
  };
};

const Header = ({ staticData }: Props) => (
  <div className="z-50 hidden w-screen items-center justify-between bg-white px-4 py-6 md:flex lg:px-8 2xl:px-12">
    <Logo staticData={staticData} />

    <div className="flex items-center justify-between gap-3 lg:gap-6">
      <AboutUsMenu staticData={staticData} />

      <Link href="/programmes" passHref>
        <PageLinkLabel>{staticData.linkLabels.programmes}</PageLinkLabel>
      </Link>

      <GetInvolvedMenu staticData={staticData} />

      <Link href="/workshops" passHref>
        <PageLinkLabel>{staticData.linkLabels.workshops}</PageLinkLabel>
      </Link>
    </div>
  </div>
);

export default Header;

const Logo = ({ staticData }: Props) => (
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
);

const PageLinkLabel = ({
  children,
}: {
  children: string | React.ReactElement;
}) => (
  <h3 className="cursor-pointer text-sm font-semibold uppercase tracking-wide text-gray-600 transition-colors duration-75 ease-in-out hover:text-gray-700 lg:text-base xl:text-lg">
    {children}
  </h3>
);

const AboutUsMenu = ({ staticData }: Props) => (
  <PagesMenu
    buttonLabel={staticData.linkLabels.aboutUs}
    xOrigin="center"
    tagline={staticData.header.aboutUs.popover.subheading}
    title={staticData.header.aboutUs.popover.heading}
  >
    <PagesMenuItem route="/about" label={staticData.linkLabels.aboutUs} />
    <PagesMenuItem
      route="/about#meet-the-team"
      label={staticData.linkLabels.meetTheTeam}
    />
    <PagesMenuItem
      route={route.getInTouch}
      label={staticData.linkLabels.getInTouch}
    />
    <PagesMenuItem
      route="/theory-of-change"
      label={staticData.linkLabels.theoryOfChange}
    />
    <PagesMenuItem
      route="/testimonials"
      label={staticData.linkLabels.testimonials}
    />
  </PagesMenu>
);

const GetInvolvedMenu = ({ staticData }: Props) => (
  <PagesMenu
    buttonLabel={staticData.linkLabels.getInvolved}
    xOrigin="right"
    tagline={staticData.header.getInvolved.popover.subheading}
    title={staticData.header.getInvolved.popover.heading}
  >
    <PagesMenuItem route="/donate" label={staticData.linkLabels.donate} />
    <PagesMenuItem route="/volunteer" label={staticData.linkLabels.volunteer} />
    <PagesMenuItem route="/careers" label={staticData.linkLabels.careers} />
  </PagesMenu>
);

const PagesMenu = ({
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
        className="group/menu-button flex items-center gap-1 lg:gap-2"
      >
        <PageLinkLabel>{buttonLabel}</PageLinkLabel>
        <span className="rounded-full p-xxxs text-brandGreen transition-all duration-100 ease-in-out group-hover/menu-button:bg-gray-100">
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

const PagesMenuItem = ({ route, label }: { route: string; label: string }) => (
  <Link href={route} passHref>
    <div className="z-50 flex cursor-pointer items-center gap-1 px-3 py-1 hover:bg-gray-100">
      <span className="grid place-items-center text-displayGreen">
        <Icon.CaretRight size={22} weight="bold" />
      </span>
      <span className="whitespace-nowrap text-lg tracking-wide">{label}</span>
    </div>
  </Link>
);
