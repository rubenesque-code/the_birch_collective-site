import Link from "next/link";
import Markdown from "markdown-to-jsx";
import livingWageLogo from "public/images/living-wage-logo.webp";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";
import { WithTooltip } from "~/components/WithTooltip";

import { strWithFallback } from "~/helpers/utilities";
import { NextImage } from "~/lib/external-packages-rename";
import { route } from "~/static-data/routes";
import { type MyDb } from "~/types/database";

type Data = {
  footer: MyDb["singles"]["footer"];
  linkLabels: MyDb["singles"]["linkLabels"];
  orgDetails: MyDb["singles"]["orgDetails"];
  logoImg: MyDb["image"] | null;
};

// todo: responsiveness needs going over!

const Footer = ({ footer, linkLabels, logoImg, orgDetails }: Data) => (
  <div className="grid items-center gap-x-xl md:grid-cols-2">
    <div className="flex-grow">
      <SocialMediaLinks socialMediaLinks={orgDetails.socialMediaLinks} />
      <div className="mt-md">
        <PageLinks linkLabels={linkLabels} />
      </div>
      <div className="mt-md flex gap-sm">
        <InfoRow footer={footer} />

        <div className="flex flex-col items-center gap-sm md:hidden">
          {logoImg ? (
            <div className="relative aspect-[1/1] w-[50px] opacity-90">
              <StorageImage urls={logoImg?.urls} />
            </div>
          ) : null}

          <div className="relative aspect-[1/1] w-[75px]">
            <NextImage
              alt=""
              src={livingWageLogo}
              fill
              placeholder="blur"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-md">
        <BottomRow contact={orgDetails.contact} footer={footer} />
      </div>
    </div>
    <SecondColumnLrg logoImg={logoImg} />
  </div>
);

export default Footer;

const SocialMediaLinks = ({
  socialMediaLinks,
}: {
  socialMediaLinks: Data["orgDetails"]["socialMediaLinks"];
}) => (
  <div className="flex items-center gap-lg">
    {socialMediaLinks.facebook.length ? (
      <WithTooltip text="visit our facebook page">
        <a
          className="text-3xl"
          href={socialMediaLinks.facebook}
          target="_blank"
        >
          <Icon.Facebook color="#3b5998" />
        </a>
      </WithTooltip>
    ) : null}

    {socialMediaLinks.instagram.length ? (
      <WithTooltip text="visit our instagram page">
        <a
          className="text-3xl"
          href={socialMediaLinks.instagram}
          target="_blank"
        >
          <Icon.Instagram color="#833AB4" />
        </a>
      </WithTooltip>
    ) : null}

    {socialMediaLinks.linkedIn.length ? (
      <WithTooltip text="visit our linkedIn page">
        <a
          className="text-3xl"
          href={socialMediaLinks.linkedIn}
          target="_blank"
        >
          <Icon.Linkedin color="#0e76a8" />
        </a>
      </WithTooltip>
    ) : null}
  </div>
);

const PageLinks = ({ linkLabels }: { linkLabels: Data["linkLabels"] }) => (
  <div className="flex max-w-[500px] flex-wrap items-center gap-x-lg gap-y-md">
    <PageLink
      href="/programmes"
      text={strWithFallback(linkLabels.programmes, "programmes")}
    />

    <PageLink
      href="/workshops"
      text={strWithFallback(linkLabels.workshops, "workshops")}
    />

    <PageLink
      href="/donate"
      text={strWithFallback(linkLabels.donate, "donate")}
    />

    <PageLink
      href="/volunteer"
      text={strWithFallback(linkLabels.volunteer, "volunteer")}
    />

    <PageLink
      href="/about"
      text={strWithFallback(linkLabels.aboutUs, "about")}
    />

    <PageLink
      href="/theory-of-change"
      text={strWithFallback(linkLabels.theoryOfChange, "theory of change")}
    />

    <PageLink
      href="/testimonials"
      text={strWithFallback(linkLabels.testimonials, "testimonials")}
    />
  </div>
);

const PageLink = ({
  href,
  text,
}: {
  href: (typeof route)[keyof typeof route];
  text: string;
}) => (
  <Link href={href} passHref>
    <div className="font-medium text-brandGreen underline">{text}</div>
  </Link>
);

const InfoRow = ({ footer }: { footer: Data["footer"] }) => (
  <div className="">
    <div className="text-gray-800">
      <Markdown>{footer.orgDescription}</Markdown>
    </div>
    <div className="mt-sm text-gray-800 md:mt-xxxs">
      <Markdown>{footer.livingWageEmployer.text}</Markdown>
    </div>
  </div>
);

const SecondColumnLrg = ({ logoImg }: { logoImg: Data["logoImg"] }) => (
  <div className="hidden items-center gap-lg md:flex">
    <div className="relative aspect-[1/1] w-[100px]">
      <NextImage
        alt=""
        src={livingWageLogo}
        fill
        placeholder="blur"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
    {logoImg ? (
      <div className="relative aspect-[1/1] w-[70px]">
        <StorageImage urls={logoImg?.urls} />
      </div>
    ) : null}
  </div>
);

const BottomRow = ({
  footer,
  contact,
}: {
  footer: Data["footer"];
  contact: Data["orgDetails"]["contact"];
}) => {
  return (
    <div className="flex flex-wrap items-center gap-x-lg gap-y-sm">
      {contact.phoneNumber ? (
        <div className="text-brandGreen">{contact.phoneNumber}</div>
      ) : null}
      {contact.email ? (
        <div className="text-brandGreen">{contact.email}</div>
      ) : null}
      <WithTooltip text="go to our message form">
        <Link href={route.message} passHref>
          <div className="text-brandGreen">{footer.message}</div>
        </Link>
      </WithTooltip>
    </div>
  );
};
