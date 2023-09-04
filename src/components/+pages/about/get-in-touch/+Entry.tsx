import React from "react";
import { Transition } from "@headlessui/react";
import { useMutation } from "react-query";

import { Icon } from "~/components/icons";
import Ui from "~/components/ui-elements";
import { WithTooltip } from "~/components/WithTooltip";

import { validateEmail } from "~/helpers/form";
import { formsubmit } from "~/lib/formsubmit";
import { sectionIds } from "~/static-data/routes";
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

    <div className="mt-md grid gap-x-2xl gap-y-xl sm:grid-cols-2">
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

  const formRequirementsMet =
    firstName.value.length &&
    email.value.length &&
    validateEmail(email.value) &&
    message.value.length;

  const sendformMutation = useMutation("send-form", formsubmit.getInTouch);

  const handleSubmit = () => {
    if (!firstName.value.length) {
      setFirstName((state) => ({ ...state, showErrorMessage: true }));
    }

    if (!email.value.length || !validateEmail(email.value)) {
      setEmail((state) => ({ ...state, showErrorMessage: true }));
    }

    if (!message.value.length) {
      setMessage((state) => ({ ...state, showErrorMessage: true }));
    }

    if (!formRequirementsMet) {
      return;
    }

    sendformMutation.mutate({
      email: email.value,
      firstName: firstName.value,
      lastName,
      message: message.value,
      subject,
    });
  };

  return (
    <div className="relative" id={sectionIds.about.getInTouch}>
      <h3 className="font-display text-4xl tracking-wide text-brandOrange">
        send us a message
      </h3>
      <div className="mt-md flex flex-col gap-md">
        <div>
          <div className="flex flex-col gap-xs">
            <label className="text-gray-500" htmlFor={inputIds.firstName}>
              First name
            </label>
            <input
              className="w-full max-w-[300px] rounded-md border border-brandLightBrown px-sm py-xs"
              id={inputIds.firstName}
              value={firstName.value}
              onChange={(e) => {
                const value = e.currentTarget.value;

                setFirstName({
                  showErrorMessage: false,
                  value,
                });
              }}
              type="text"
              placeholder="Enter first name here"
            />
          </div>
          {firstName.showErrorMessage ? (
            <p className="mt-xxxs text-sm text-red-500">First name required.</p>
          ) : null}
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
              const value = e.currentTarget.value;

              setLastName(value);
            }}
            type="text"
            placeholder="Enter last name here"
          />
        </div>

        <div>
          <div className="flex flex-col gap-xs">
            <label className="text-gray-500" htmlFor={inputIds.email}>
              Email
            </label>
            <input
              className="w-full max-w-[300px] rounded-md border border-brandLightBrown px-sm py-xs"
              id={inputIds.email}
              value={email.value}
              onChange={(e) => {
                const value = e.currentTarget.value;

                setEmail({
                  showErrorMessage: false,
                  value,
                });
              }}
              type="text"
              placeholder="Enter email here"
            />
          </div>
          {email.showErrorMessage ? (
            <p className="mt-xxxs text-sm text-red-500">
              Valid email required.
            </p>
          ) : null}
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
              const value = e.currentTarget.value;

              setSubject(value);
            }}
            type="text"
            placeholder="Enter subject here"
          />
        </div>

        <div>
          <div className="flex flex-col gap-xs">
            <label className="text-gray-500" htmlFor={inputIds.message}>
              Message
            </label>
            <textarea
              className="h-[160px] w-full max-w-[500px] resize-none rounded-md border border-brandLightBrown px-sm py-xs"
              id={inputIds.message}
              value={message.value}
              onChange={(e) => {
                const value = e.currentTarget.value;

                setMessage({
                  showErrorMessage: false,
                  value,
                });
              }}
              placeholder="Enter message here"
            />
          </div>
          {message.showErrorMessage ? (
            <p className="mt-xxxs text-sm text-red-500">Message required.</p>
          ) : null}
        </div>

        <div
          className={`self-start rounded-md border border-brandLightBrown px-sm py-xs text-sm uppercase text-brandBrown transition-all duration-75 ease-in-out ${
            formRequirementsMet
              ? "cursor-pointer hover:bg-gray-100"
              : "cursor-pointer hover:bg-gray-100"
          }`}
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>

      <FormStatusOverlay
        closeOverlay={() => {
          sendformMutation.reset();

          setFirstName({ value: "", showErrorMessage: false });
          setLastName("");
          setEmail({ value: "", showErrorMessage: false });
          setSubject("");
          setMessage({ value: "", showErrorMessage: false });
        }}
        status={sendformMutation.status}
      />
    </div>
  );
};

const FormStatusOverlay = ({
  status,
  closeOverlay,
}: {
  status: "error" | "idle" | "loading" | "success";
  closeOverlay: () => void;
}) => (
  <Transition
    show={status === "error" || status === "loading" || status === "success"}
    as="div"
    className="absolute left-0 top-0 grid h-full w-full place-items-center bg-white/60"
    enter="transition duration-300 ease-out"
    enterFrom="transform opacity-0"
    enterTo="transform opacity-100"
    leave="transition duration-500 ease-out"
    leaveFrom="transform opacity-100"
    leaveTo="transform opacity-0"
  >
    <div className={`flex flex-col items-center leading-loose text-gray-700`}>
      <p className={`mt-sm text-center`}>
        {status === "error" ? (
          <>
            Something went wrong.
            <br />
            Please try again.
          </>
        ) : status === "loading" ? (
          "Sending..."
        ) : (
          <>
            Form submitted successfully.
            <br />
            Thanks!
          </>
        )}
      </p>
      {status !== "loading" ? (
        <button
          className="mt-md rounded-md border px-sm text-gray-500 transition-all duration-75 ease-in-out hover:bg-gray-100"
          onClick={closeOverlay}
          type="button"
        >
          Ok
        </button>
      ) : null}
    </div>
  </Transition>
);

const OtherContacts = ({
  orgDetails,
}: {
  orgDetails: MyDb["singles"]["orgDetails"];
}) => (
  <div className="flex flex-col gap-lg">
    {orgDetails.contact.phoneNumber.length ? (
      <div>
        <h3 className="font-display text-4xl tracking-wide text-brandOrange">
          call
        </h3>
        <p className="mt-md italic text-gray-400">
          Only answered on Thursdays at the moment!
        </p>
        <p className="mt-xs text-gray-700">{orgDetails.contact.phoneNumber}</p>
      </div>
    ) : null}

    <div>
      <h3 className="font-display text-4xl tracking-wide text-brandOrange">
        email
      </h3>
      <p className="mt-md text-gray-700">{orgDetails.contact.email}</p>
    </div>

    {orgDetails.socialMediaLinks.facebook.length ||
    orgDetails.socialMediaLinks.instagram.length ||
    orgDetails.socialMediaLinks.linkedIn.length ? (
      <div>
        <h3 className="font-display text-4xl tracking-wide text-brandOrange">
          social media
        </h3>
        <div className="mt-md">
          <SocialMediaLinks socialMediaLinks={orgDetails.socialMediaLinks} />
        </div>
      </div>
    ) : null}
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
