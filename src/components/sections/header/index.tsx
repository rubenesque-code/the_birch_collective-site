import React from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";

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

const Header = ({ staticData }: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-6 lg:px-8 2xl:px-12">
      <LogoAndOrgName staticData={staticData} />

      <PageLinksSmall staticData={staticData} />
      <PageLinksLarge staticData={staticData} />
    </div>
  );
};

export default Header;

const PageLinksLarge = ({ staticData }: Props) => (
  <div className="hidden flex-grow justify-end lg:flex">
    <div className="mt-xs flex flex-wrap items-center justify-between gap-x-sm gap-y-xs md:mt-0 lg:gap-md">
      <HeaderMenu
        buttonText={staticData.linkLabels.aboutUs}
        menu={{
          heading: staticData.header.aboutUs.popover.heading,
          subheading: staticData.header.aboutUs.popover.subheading,
          items: [
            <HeaderMenuItem
              route={route.about}
              text={staticData.linkLabels.aboutUs}
              key="about"
            />,
            <HeaderMenuItem
              route={route.meetTheTeam}
              text={staticData.linkLabels.meetTheTeam}
              key="meet"
            />,
            <HeaderMenuItem
              route={route.getInTouch}
              text={staticData.linkLabels.getInTouch}
              key="touch"
            />,
            <HeaderMenuItem
              route={route.theoryOfChange}
              text={staticData.linkLabels.theoryOfChange}
              key="theory"
            />,
            <HeaderMenuItem
              route={route.testimonials}
              text={staticData.linkLabels.testimonials}
              key="test"
            />,
          ],
        }}
      />

      <Link href="/programmes" passHref>
        <PageLabel>{staticData.linkLabels.programmes}</PageLabel>
      </Link>

      {/* <GetInvolvedMenu staticData={staticData} /> */}
      <HeaderMenu
        buttonText={staticData.linkLabels.getInvolved}
        menu={{
          heading: staticData.header.getInvolved.popover.heading,
          subheading: staticData.header.getInvolved.popover.subheading,
          items: [
            <HeaderMenuItem
              route={route.donate}
              text={staticData.linkLabels.donate}
              key="donate"
            />,
            <HeaderMenuItem
              route={route.volunteer}
              text={staticData.linkLabels.volunteer}
              key="volunteer"
            />,
            <HeaderMenuItem
              route={route.careers}
              text={staticData.linkLabels.careers}
              key="careers"
            />,
          ],
        }}
      />

      <Link href="/workshops" passHref>
        <PageLabel>{staticData.linkLabels.workshops}</PageLabel>
      </Link>
    </div>
  </div>
);

const LogoAndOrgName = ({ staticData }: Props) => (
  <Link href="/" passHref>
    <div className="flex cursor-pointer flex-nowrap items-center gap-xs">
      {staticData.logoImg ? (
        <div className="relative aspect-[1/1] w-[45px] xs:w-[50px] sm:w-[60px]">
          <StorageImage urls={staticData.logoImg.urls} />
        </div>
      ) : null}

      <h3 className="whitespace-nowrap font-display text-3xl font-bold tracking-wider text-display lg:text-4xl xl:text-6xl">
        {staticData.orgDetails.name}
      </h3>
    </div>
  </Link>
);

const PageLabel = ({ children }: { children: string | React.ReactElement }) => (
  <h3 className="cursor-pointer text-sm font-semibold uppercase tracking-wide text-gray-600 transition-colors duration-75 ease-in-out hover:text-gray-700 lg:text-base xl:text-lg">
    {children}
  </h3>
);

const HeaderMenu = ({
  buttonText,
  menu,
}: {
  buttonText: string;
  menu: { heading: string; subheading: string; items: React.ReactElement[] };
}) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(
    null,
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Menu as="div" className="relative z-30 inline-grid place-items-center">
      <Menu.Button
        as="div"
        className="group/menu-button flex cursor-pointer items-center gap-xxxs lg:gap-2"
        ref={setReferenceElement}
      >
        <PageLabel>{buttonText}</PageLabel>

        <span className="rounded-full p-xxxs text-sm text-brandGreen transition-all duration-100 ease-in-out group-hover/menu-button:bg-gray-100 sm:text-base">
          <Icon.CaretDown weight="bold" />
        </span>
      </Menu.Button>

      <Transition
        as="div"
        className="absolute -bottom-xs left-0 translate-y-full rounded-sm border bg-white shadow-lg outline-none focus:outline-none"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <Menu.Items
          as="div"
          className="w-full px-10 py-8 outline-none focus:outline-none lg:px-14 lg:py-10"
        >
          <h3 className="font-display text-4xl font-bold tracking-wide text-displayGreen">
            {menu.heading}
          </h3>

          <p className="mt-2 text-lg">{menu.subheading}</p>

          <div className="gap mt-4 grid w-[70vw] max-w-[800px] grid-cols-1 gap-lg gap-y-sm uppercase xs:grid-cols-2 md:grid-cols-3">
            {menu.items}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const HeaderMenuItem = ({ route, text }: { route: string; text: string }) => (
  <Link href={route} passHref>
    <Menu.Item>
      <div className="z-50 flex cursor-pointer flex-nowrap items-center gap-1 px-3 py-1 hover:bg-gray-100">
        <span className="grid place-items-center text-displayGreen lg:text-lg">
          <Icon.CaretRight weight="bold" />
        </span>
        <span className="whitespace-nowrap tracking-wide lg:text-lg">
          {text}
        </span>
      </div>
    </Menu.Item>
  </Link>
);

const PageLinksSmall = ({ staticData }: Props) => (
  <Menu as="div" className="z-50 grid place-items-center lg:hidden">
    {({ open }) => (
      <>
        <OnPageLinksSmallOpen isOpen={open} />

        <Menu.Button className="text-2xl">
          {({ open }) =>
            !open ? (
              <span className="text-brandBrown">
                <Icon.HeaderMenu weight="bold" />
              </span>
            ) : (
              <span className="text-brandGreen">
                <Icon.Close weight="bold" />
              </span>
            )
          }
        </Menu.Button>

        <Transition
          as="div"
          className="fixed left-0 w-screen"
          style={{
            height: `calc(100vh - 90px)`,
            top: 90,
          }}
          enter="transition ease-out duration-150"
          enterFrom="transform opacity-0 translate-x-full"
          enterTo="transform opacity-100 scale-100 translate-x-0"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100 translate-x-0"
          leaveTo="transform opacity-0 translate-x-full"
        >
          <Menu.Items
            as="div"
            className="flex h-full max-h-full w-full flex-col gap-sm overflow-y-auto bg-white px-10 py-8 outline-none focus:outline-none lg:px-14 lg:py-10"
          >
            <PageLinkSmall
              route={route.about}
              text={staticData.linkLabels.aboutUs}
            />
            <div className="flex flex-col gap-sm border-l pl-sm">
              <PageLinkSmall
                route={route.meetTheTeam}
                text={staticData.linkLabels.meetTheTeam}
              />
              <PageLinkSmall
                route={route.getInTouch}
                text={staticData.linkLabels.getInTouch}
              />
            </div>

            <PageLinkSmall
              route={route.programmes}
              text={staticData.linkLabels.programmes}
            />

            <PageLinkSmall
              route={route.workshops}
              text={staticData.linkLabels.workshops}
            />

            <PageLinkSmall
              route={route.testimonials}
              text={staticData.linkLabels.testimonials}
            />
            <PageLinkSmall
              route={route.theoryOfChange}
              text={staticData.linkLabels.theoryOfChange}
            />
            <PageLinkSmall
              route={route.donate}
              text={staticData.linkLabels.donate}
            />
            <PageLinkSmall
              route={route.volunteer}
              text={staticData.linkLabels.volunteer}
            />
            <PageLinkSmall
              route={route.careers}
              text={staticData.linkLabels.careers}
            />
          </Menu.Items>
        </Transition>
      </>
    )}
  </Menu>
);

const OnPageLinksSmallOpen = ({ isOpen }: { isOpen: boolean }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return <></>;
};

const PageLinkSmall = ({ route, text }: { route: string; text: string }) => (
  <Link href={route} passHref>
    <Menu.Item
      as="div"
      className="group/link flex w-full items-center justify-between uppercase tracking-wide"
    >
      <span className="text-brandBrown opacity-80 transition-opacity duration-75 ease-in-out group-hover/link:opacity-100">
        {text}
      </span>
      <span className="rounded-full py-xxxs text-brandGreen opacity-80 transition-opacity duration-75 ease-in-out group-hover/link:bg-gray-100 group-hover/link:opacity-100">
        <Icon.CaretRight />
      </span>
    </Menu.Item>
  </Link>
);
