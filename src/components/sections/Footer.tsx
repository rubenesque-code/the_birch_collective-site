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

export const Footer = (data: Data) => (
  <>
    <FooterLrg {...data} />
    <FooterSml {...data} />
  </>
);

const FooterLrg = ({ footer, linkLabels, logoImg, orgDetails }: Data) => (
  <div className="hidden items-center gap-[4.5rem] md:flex">
    <div className="flex-grow">
      <SocialMediaLinks socialMediaLinks={orgDetails.socialMediaLinks} />

      <div className="mt-md">
        <PageLinks linkLabels={linkLabels} />
      </div>

      <div className="mt-md">
        <InfoRowLrg footer={footer} />
      </div>

      <div className="mt-md">
        <BottomRow contact={orgDetails.contact} footer={footer} />
      </div>
    </div>

    <SecondColumnLrg logoImg={logoImg} />
  </div>
);

const SecondColumnLrg = ({ logoImg }: { logoImg: Data["logoImg"] }) => (
  <div className="flex items-center gap-lg">
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
        <StorageImage urls={logoImg?.urls} sizes="100px" />
      </div>
    ) : null}
  </div>
);

const FooterSml = ({ footer, linkLabels, logoImg, orgDetails }: Data) => (
  <div className="flex flex-col gap-md md:hidden">
    <SocialMediaLinks socialMediaLinks={orgDetails.socialMediaLinks} />

    <PageLinks linkLabels={linkLabels} />

    <InfoRowSml footer={footer} logoImg={logoImg} />

    <BottomRow contact={orgDetails.contact} footer={footer} />
  </div>
);

const InfoRowSml = ({
  footer,
  logoImg,
}: {
  footer: Data["footer"];
  logoImg: Data["logoImg"];
}) => (
  <div className="flex flex-col gap-xs">
    <div className="flex items-center justify-between">
      <div className="text-gray-800">
        <Markdown>{footer.orgDescription}</Markdown>
      </div>

      <div className="flex w-[100px] flex-shrink-0 justify-center">
        {logoImg ? (
          <div className="relative aspect-[1/1] w-[50px]">
            <StorageImage urls={logoImg?.urls} sizes="100px" />
          </div>
        ) : (
          <span />
        )}
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="text-gray-800">
        <Markdown>{footer.livingWageEmployer.text}</Markdown>
      </div>

      <div className="flex w-[100px] flex-shrink-0 justify-center">
        <div className="relative aspect-[1/1] w-[60px]">
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
  </div>
);

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
      href={route.programmes}
      text={strWithFallback(linkLabels.programmes, "programmes")}
    />

    <PageLink
      href={route.workshops}
      text={strWithFallback(linkLabels.workshops, "workshops")}
    />

    <PageLink
      href={route.donate}
      text={strWithFallback(linkLabels.donate, "donate")}
    />

    <PageLink
      href={route.volunteer}
      text={strWithFallback(linkLabels.volunteer, "volunteer")}
    />

    <PageLink
      href={route.about}
      text={strWithFallback(linkLabels.aboutUs, "about")}
    />

    {/*     <PageLink
      href={route.theoryOfChange}
      text={strWithFallback(linkLabels.theoryOfChange, "theory of change")}
    /> */}

    <PageLink
      href={route.testimonials}
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

const InfoRowLrg = ({ footer }: { footer: Data["footer"] }) => (
  <div className="">
    <div className="text-gray-800">
      <Markdown>{footer.orgDescription}</Markdown>
    </div>
    <div className="mt-sm text-gray-800 md:mt-xxxs">
      <Markdown>{footer.livingWageEmployer.text}</Markdown>
    </div>
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

      <div className="text-brandGreen">07871843893</div>

      {contact.email ? (
        <div className="text-brandGreen">{contact.email}</div>
      ) : null}

      <WithTooltip text="go to our message form">
        <Link href={route.getInTouch} passHref>
          <div className="text-brandGreen">{footer.message}</div>
        </Link>
      </WithTooltip>
    </div>
  );
};
