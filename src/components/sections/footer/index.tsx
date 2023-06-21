import { type ReactElement } from "react";
import NextImage from "next/image";
import Link from "next/link";

import { Icons } from "~/components/icons";
import { localImages } from "~/assets/images";
import {
  type EditableLabels,
  type MyPick,
  type OrgDetails,
} from "~/types/database";
import StorageImage from "~/components/StorageImage";

// □ populate message link href

type Props = {
  siteLinkLabels: MyPick<
    EditableLabels["sections"],
    "about" | "donate" | "programmes" | "volunteer" | "workshops"
  >;
  orgDetails: OrgDetails;
};

const Footer = ({ siteLinkLabels, orgDetails }: Props) => {
  return (
    <footer
      className="flex flex-col gap-4 pb-11 pt-10 sm:flex-row sm:justify-between sm:gap-0"
      test-id="footer"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <SocialMedia
            href={orgDetails.socialMediaLinks.facebook}
            icon={<Icons.facebook size={28} color="#3b5998" />}
            testId="facebook"
          />
          <SocialMedia
            href={orgDetails.socialMediaLinks.instagram}
            icon={<Icons.instagram size={28} color="#833AB4" />}
            testId="instagram"
          />
          <SocialMedia
            href={orgDetails.socialMediaLinks.linkedIn}
            icon={<Icons.linkedIn size={28} color="#0e76a8" />}
            testId="linkedIn"
          />
        </div>

        <div className="flex flex-wrap gap-8 gap-y-2 sm:text-lg">
          <SitePage
            href={"/programmes"}
            label={siteLinkLabels.programmes}
            testId="programmes"
          />
          <SitePage
            href={"/workshops"}
            label={siteLinkLabels.workshops}
            testId="workshops"
          />
          <SitePage
            href={"/donate"}
            label={siteLinkLabels.donate}
            testId="donate"
          />
          <SitePage
            href={"/volunteer"}
            label={siteLinkLabels.volunteer}
            testId="volunteer"
          />
          <SitePage
            href={"/about-us"}
            label={siteLinkLabels.about}
            testId="about-us"
          />
        </div>

        <div>
          <p className="text-sm text-gray-700" test-id="org-info-snippet">
            The Birch Collective is a Bristol based charity specialising in
            helping vulnerable young people.
          </p>
        </div>

        <div className="flex flex-col gap-8 gap-y-2 font-medium text-brandGreen underline sm:flex-row sm:items-center">
          <NextImage
            src={localImages.org.phoneNumber}
            // layout="fixed"
            width={100}
            height={16}
            alt=""
            test-id="phone-number"
          />
          <NextImage
            src={localImages.org.email}
            // layout="fixed"
            width={230}
            height={16}
            alt=""
            test-id="email"
          />
          <Link href={""} test-id="message">
            message
          </Link>
        </div>
      </div>

      <div className="grid place-items-start sm:place-items-center">
        <div className="flex flex-col gap-1 sm:items-center">
          <h4 className="font-display text-4xl font-bold tracking-wide text-brandGreen sm:text-center sm:text-2xl">
            The <br /> Birch Collective
          </h4>
          <div className="relative h-[35px] w-[35px] lg:h-[35px] lg:w-[35px] xl:h-[50px] xl:w-[50px]">
            <StorageImage image={{ id: "", urlEndpoint: "" }} />
            {/* <ImageComponent image={logoImg} /> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

const SitePage = ({
  href,
  label,
  testId,
}: {
  href: string;
  testId: string;
  label: string;
}) => (
  <Link href={href} passHref test-id={testId}>
    <p className="cursor-pointer  font-medium capitalize text-brandGreen underline">
      {label}
    </p>
  </Link>
);

const SocialMedia = ({
  href,
  icon,
  testId,
}: {
  href: string;
  icon: ReactElement;
  testId: string;
}) => (
  <a
    className="cursor-pointer"
    href={href}
    target="_blank"
    rel="noreferrer"
    test-id={testId}
  >
    {icon}
  </a>
);

export { Footer, type Props as FooterProps };
