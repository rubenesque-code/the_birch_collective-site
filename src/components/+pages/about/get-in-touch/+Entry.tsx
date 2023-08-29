import React from "react";

import { Icon } from "~/components/icons";
import Ui from "~/components/ui-elements";
import { WithTooltip } from "~/components/WithTooltip";

import type { MyDb } from "~/types/database";

const GetInTouch = ({
  orgDetails,
}: {
  orgDetails: MyDb["singles"]["orgDetails"];
}) => (
  <div>
    <Ui.Section.Heading className="text-brandBrown">
      Get in Touch
    </Ui.Section.Heading>

    <Ui.Section.VerticalSpace />

    <Ui.Section.Description>
      Have any questions? Don&apos;t hesitate to contact us...
    </Ui.Section.Description>

    <div className="mt-md grid grid-cols-2 gap-2xl">
      <ContactForm />

      <OtherContacts orgDetails={orgDetails} />
    </div>
  </div>
);

export default GetInTouch;

const inputIds = {
  firstName: "contact-form-first-name",
  lastName: "contact-form-last-name",
  email: "contact-form-email",
  subject: "contact-form-subject",
  message: "contact-form-message",
};

const ContactForm = () => {
  const [firstName, setFirstName] = React.useState({
    value: "",
    showErrorMessage: false,
  });
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState({
    value: "",
    showErrorMessage: false,
  });
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState({
    value: "",
    showErrorMessage: false,
  });

  return (
    <div>
      <h3 className="font-display text-4xl tracking-wide text-brandOrange">
        Send us a message
      </h3>
      <div className="mt-md flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <label className="text-gray-500" htmlFor={inputIds.firstName}>
            First name
          </label>
          <input
            className="w-full max-w-[300px] rounded-md border border-brandLightBrown px-sm py-xs"
            id={inputIds.firstName}
            value={firstName.value}
            onChange={(e) => {
              setFirstName((state) => ({
                ...state,
                value: e.currentTarget.value,
              }));
            }}
            type="text"
            placeholder="Enter first name here"
          />
        </div>

        <div className="flex flex-col gap-xs">
          <div className="flex gap-sm">
            <label className="text-gray-500" htmlFor={inputIds.lastName}>
              Last name
            </label>
            <p className="italic text-gray-400">Optional</p>
          </div>
          <input
            className="w-full max-w-[300px] rounded-md border border-brandLightBrown px-sm py-xs"
            id={inputIds.lastName}
            value={lastName}
            onChange={(e) => {
              setLastName(e.currentTarget.value);
            }}
            type="text"
            placeholder="Enter last name here"
          />
        </div>

        <div className="flex flex-col gap-xs">
          <label className="text-gray-500" htmlFor={inputIds.email}>
            Email
          </label>
          <input
            className="w-full max-w-[300px] rounded-md border border-brandLightBrown px-sm py-xs"
            id={inputIds.email}
            value={email.value}
            onChange={(e) => {
              setEmail((state) => ({
                ...state,
                value: e.currentTarget.value,
              }));
            }}
            type="text"
            placeholder="Enter email here"
          />
        </div>

        <div className="flex flex-col gap-xs">
          <div className="flex gap-sm">
            <label className="text-gray-500" htmlFor={inputIds.subject}>
              Subject
            </label>
            <p className="italic text-gray-400">Optional</p>
          </div>
          <input
            className="w-full max-w-[300px] rounded-md border border-brandLightBrown px-sm py-xs"
            id={inputIds.subject}
            value={subject}
            onChange={(e) => {
              setSubject(e.currentTarget.value);
            }}
            type="text"
            placeholder="Enter subject here"
          />
        </div>

        <div className="flex flex-col gap-xs">
          <label className="text-gray-500" htmlFor={inputIds.message}>
            Message
          </label>
          <textarea
            className="w-full max-w-[500px] resize-none rounded-md border border-brandLightBrown px-sm py-xs"
            id={inputIds.message}
            value={message.value}
            onChange={(e) => {
              setMessage((state) => ({
                ...state,
                value: e.currentTarget.value,
              }));
            }}
            placeholder="Enter message here"
          />
        </div>
      </div>
    </div>
  );
};

const OtherContacts = ({
  orgDetails,
}: {
  orgDetails: MyDb["singles"]["orgDetails"];
}) => (
  <div className="flex flex-col gap-lg">
    <div>
      <h3 className="font-display text-4xl tracking-wide text-brandOrange">
        Call
      </h3>
      <p className="mt-md italic text-gray-400">
        Only answered on Thursdays at the moment!
      </p>
      <p className="mt-xs text-gray-700">{orgDetails.contact.phoneNumber}</p>
    </div>

    <div>
      <h3 className="font-display text-4xl tracking-wide text-brandOrange">
        Email
      </h3>
      <p className="mt-md text-gray-700">{orgDetails.contact.email}</p>
    </div>

    <div>
      <h3 className="font-display text-4xl tracking-wide text-brandOrange">
        Social Media
      </h3>
      <div className="mt-md">
        <SocialMediaLinks socialMediaLinks={orgDetails.socialMediaLinks} />
      </div>
    </div>
  </div>
);

const SocialMediaLinks = ({
  socialMediaLinks,
}: {
  socialMediaLinks: MyDb["singles"]["orgDetails"]["socialMediaLinks"];
}) => (
  <div className="flex items-center gap-md">
    {socialMediaLinks.facebook.length ? (
      <WithTooltip text="visit our facebook page">
        <a
          className="text-2xl"
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
          className="text-2xl"
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
          className="text-2xl"
          href={socialMediaLinks.linkedIn}
          target="_blank"
        >
          <Icon.Linkedin color="#0e76a8" />
        </a>
      </WithTooltip>
    ) : null}
  </div>
);
