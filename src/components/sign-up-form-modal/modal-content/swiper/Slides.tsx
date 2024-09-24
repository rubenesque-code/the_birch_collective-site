import React from "react";
import { SwiperSlide } from "swiper/react";

import { ComponentApiCx } from "../../_state";
import { Text } from "./_components";
import { useFocusFirstInput } from "./_hooks";
import { FormCx, UserEnteredDataCx } from "./_state";
import type { SlideId } from "./_types";

import { formsubmit } from "~/lib/formsubmit";
import { isDevMode } from "~/static-data/process";

const SlideWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute grid h-full max-h-full w-full max-w-full place-items-center overflow-y-auto overflow-x-hidden p-xs">
    <div className="w-full">{children}</div>
  </div>
);

const InputSlideWrapper = ({
  questionNumber,
  heading,
  subheading,
  children,
}: {
  questionNumber: number;
  heading: string;
  subheading?: string;
  errorText?: string;
  isRequired?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-xs">
      <div className="text-xl font-medium text-brandOrange">
        <span className="mr-xs text-lg text-[#2F4858]">{questionNumber}.</span>
        {heading}
      </div>

      {subheading ? <p className="mt-xs text-gray-500">{subheading}</p> : null}

      <div className="mt-md">{children}</div>
    </div>
  );
};

const Slide1 = () => (
  <SlideWrapper>
    <Text classes="font-bold">
      Thanks for showing an interest in one of our events.
    </Text>

    <Text classes="mt-md">
      The following questions help us get to know a bit about you. We need to
      take some really basic info from you, such as your contact details. This
      means we can get in touch with you so we can discuss getting started - so
      please double-check the details you&apos;re giving us are correct!
    </Text>
  </SlideWrapper>
);

const slide1ButtonText = "Start";

const Slide2 = () => (
  <SlideWrapper>
    <Text>
      First up, we need you to read and understand our confidentiality
      statement: Anything you talk about with one of our team is kept totally
      private within Birch. We won&apos;t share what you tell us with anyone
      else. But if there was an extreme situation, like if you or someone else
      was at risk of being seriously hurt, then we would need to break
      confidentiality to keep you safe. If this happened we would discuss it
      with you first and do our best to make sure you were involved in any
      decisions that have to be made. We know this can be scary and you might
      not want us to share anything, but we will support you through the whole
      thing.
    </Text>
  </SlideWrapper>
);

const slide2ButtonText = "Got it";

const Slide3 = () => (
  <SlideWrapper>
    <Text>
      By signing this form, you are giving us permission to contact you about
      opportunities and events from the Birch Collective. In order to comply
      with the General Data Protection Regulation, The Birch Collective is
      seeking your consent to hold your information on our database. We are
      required by our funders to gather information about the people who use our
      services. We will not share your information with third parties other than
      those you have agreed to. We use and store any information that you give
      us in accordance with the Data Protection Act 2003. Information you
      provide will be anonymised before being used in monitoring and evaluation
      reports for our current funders, to support funding applications. Your
      data will be held for a maximum of 2 years after your last engagement. For
      further details on our data protection and information sharing policies or
      for any queries about the data we hold, please get in touch:
    </Text>

    <div className="mt-sm flex flex-col items-center justify-center gap-xs text-lg text-[#2F4858] md:flex-row">
      <div className="italic">team@thebirchcollective.co.uk</div>

      <span>or</span>

      <div className="italic">07492923273</div>
    </div>
  </SlideWrapper>
);

const slide3ButtonText = "I understand";

const Slide4 = () => {
  const { setInputNode } = useFocusFirstInput(3);

  const { name } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Your full name"
        questionNumber={1}
        errorText="Oops...please enter your full name"
        isRequired
      >
        <input
          className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
          value={name.value}
          onChange={(e) => {
            name.update(e.target.value);

            errorMessageVisibility.update("hide");
          }}
          type="text"
          placeholder="Enter full name here"
          ref={setInputNode}
        />
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide5 = () => {
  const { setInputNode } = useFocusFirstInput(4);

  const { dob } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Your date of birth:"
        questionNumber={2}
        errorText="Oops...please enter a valid date."
        isRequired
      >
        <div className="mt-md flex gap-md">
          <div className="flex flex-col gap-xs text-[#2F4858]">
            <label className="text-gray-400" htmlFor="day">
              day
            </label>
            <input
              className="w-[80px] text-lg"
              id="day"
              value={dob.value.day}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (!isFinite(value)) {
                  return;
                }

                errorMessageVisibility.update("hide");

                dob.update((draft) => {
                  draft.day = value;
                });
              }}
              type="text"
              ref={setInputNode}
            />
          </div>

          <div className="flex flex-col gap-xs text-[#2F4858]">
            <label className="text-gray-400" htmlFor="month">
              month
            </label>
            <input
              className="w-[80px] text-lg"
              id="month"
              value={dob.value.month}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (!isFinite(value)) {
                  return;
                }

                errorMessageVisibility.update("hide");

                dob.update((draft) => {
                  draft.month = value;
                });
              }}
              type="text"
            />
          </div>

          <div className="flex flex-col gap-xs text-[#2F4858]">
            <label className="text-gray-400" htmlFor="year">
              year
            </label>
            <input
              className="w-[80px] text-lg"
              id="year"
              value={dob.value.year}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (!isFinite(value)) {
                  return;
                }

                errorMessageVisibility.update("hide");

                dob.update((draft) => {
                  draft.year = value;
                });
              }}
              type="text"
            />
          </div>
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide6 = () => {
  const { setInputNode } = useFocusFirstInput(5);

  const { email } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Your email address:"
        questionNumber={3}
        errorText="Oops...please enter a valid email."
        isRequired
      >
        <input
          className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
          value={email.value}
          onChange={(e) => {
            email.update(e.target.value);

            errorMessageVisibility.update("hide");
          }}
          type="text"
          placeholder="Enter email here"
          ref={setInputNode}
        />
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide7 = () => {
  const { setInputNode } = useFocusFirstInput(6);

  const { phoneNumber } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Your phone number:"
        questionNumber={4}
        errorText="Oops...please enter a valid phone number."
        isRequired
      >
        <input
          className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
          value={phoneNumber.value}
          onChange={(e) => {
            phoneNumber.update(e.target.value);

            errorMessageVisibility.update("hide");
          }}
          placeholder="Enter phone number here"
          ref={setInputNode}
        />
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide8 = () => {
  const { setInputNode } = useFocusFirstInput(7);

  const { address } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Your Address"
        questionNumber={5}
        errorText="Please complete line 1, town/city and postcode."
        isRequired
      >
        <div className="flex flex-col gap-sm">
          <div>
            <label className="text-sm text-gray-500" htmlFor="line1">
              Line 1
            </label>
            <input
              id="line1"
              className="mt-xs w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
              value={address.value.line1}
              onChange={(e) => {
                address.update((draft) => {
                  draft.line1 = e.target.value;
                });

                errorMessageVisibility.update("hide");
              }}
              type="text"
              placeholder="Line 1"
              ref={setInputNode}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500" htmlFor="line2">
              Line 2
            </label>
            <input
              id="line1"
              className="mt-xs w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
              value={address.value.line2}
              onChange={(e) => {
                address.update((draft) => {
                  draft.line2 = e.target.value;
                });
              }}
              type="text"
              placeholder="Line 2 (optional)"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500" htmlFor="town/city">
              Town/City
            </label>
            <input
              id="town/city"
              className="mt-xs w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
              value={address.value.townOrcity}
              onChange={(e) => {
                address.update((draft) => {
                  draft.townOrcity = e.target.value;
                });

                errorMessageVisibility.update("hide");
              }}
              type="text"
              placeholder="Town/City"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500" htmlFor="postcode">
              Postcode
            </label>
            <input
              id="postcode"
              className="mt-xs w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
              value={address.value.postcode}
              onChange={(e) => {
                address.update((draft) => {
                  draft.postcode = e.target.value;
                });

                errorMessageVisibility.update("hide");
              }}
              type="text"
              placeholder="Postcode"
            />
          </div>
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide9 = () => {
  const { setInputNode } = useFocusFirstInput(8);

  const { emergencyContact } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Emergency contact details:"
        questionNumber={7}
        errorText="Please provide contact details."
        isRequired
      >
        <div className="flex flex-col gap-sm">
          <div>
            <label className="text-sm text-gray-500" htmlFor="emergency-name">
              Name
            </label>
            <input
              id="emergency-name"
              className="mt-xs w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
              value={emergencyContact.value.name}
              onChange={(e) => {
                emergencyContact.update((draft) => {
                  draft.name = e.target.value;
                });

                errorMessageVisibility.update("hide");
              }}
              type="text"
              placeholder="Enter name here"
              ref={setInputNode}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500" htmlFor="emergency-phone">
              Phone number
            </label>
            <input
              className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
              id="emergency-phone"
              value={emergencyContact.value.phoneNumber}
              onChange={(e) => {
                emergencyContact.update((draft) => {
                  draft.phoneNumber = e.target.value;
                });

                errorMessageVisibility.update("hide");
              }}
              type="text"
              placeholder="Enter phone number here"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500" htmlFor="emergency-phone">
              Relationship
            </label>
            <input
              className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
              id="emergency-relationship"
              value={emergencyContact.value.relationship}
              onChange={(e) => {
                emergencyContact.update((draft) => {
                  draft.relationship = e.target.value;
                });

                errorMessageVisibility.update("hide");
              }}
              type="text"
              placeholder="Enter relationship here"
            />
          </div>
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide10 = () => {
  const { identities } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Do you identify as any of the following?"
        subheading="Tick all that apply to you."
        questionNumber={6}
        errorText="Oops...please enter one of the options"
        isRequired
      >
        <div className="mt-md flex flex-col gap-xs">
          {identities.value.map((option) => (
            <div className="flex items-center gap-sm" key={option.label}>
              <input
                id={option.label}
                checked={option.isSelected}
                onChange={(e) => {
                  const labelStr = e.currentTarget.id;

                  identities.update((draft) => {
                    const index = draft.findIndex(
                      (option) => option.label === labelStr,
                    );

                    if (index < 0) {
                      return;
                    }

                    if (labelStr === "none of the above") {
                      draft.forEach((option, i) => {
                        if (i === index) {
                          return;
                        }
                        option.isSelected = false;
                      });
                    } else {
                      const noneOptionIndex = draft.findIndex(
                        (option) => option.label === "none of the above",
                      );
                      draft[noneOptionIndex].isSelected = false;
                    }

                    draft[index].isSelected = !draft[index].isSelected;
                  });

                  errorMessageVisibility.update("hide");
                }}
                type="checkbox"
              />
              <label className="text-lg text-[#2F4858]" htmlFor={option.label}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide11 = () => {
  const { setInputNode } = useFocusFirstInput(10);

  const { ethnicity } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Your ethnicity"
        questionNumber={8}
        errorText="Oops...please provide an answer"
        isRequired
      >
        <input
          className="mt-sm w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
          value={ethnicity.value}
          onChange={(e) => {
            ethnicity.update(e.target.value);

            errorMessageVisibility.update("hide");
          }}
          type="text"
          placeholder="Enter ethnicity here"
          ref={setInputNode}
        />
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide12 = () => {
  const { genders } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Do you identify as any of the following?"
        subheading="Tick all that apply to you."
        questionNumber={9}
        errorText="Oops...please select one of the options"
        isRequired
      >
        <div className="flex flex-col gap-xs">
          {genders.value.map((option) => (
            <div className="flex items-center gap-sm" key={option.label}>
              <input
                id={option.label}
                checked={option.isSelected}
                onChange={(e) => {
                  const labelStr = e.currentTarget.id;

                  genders.update((draft) => {
                    const index = draft.findIndex(
                      (option) => option.label === labelStr,
                    );

                    if (index < 0) {
                      return;
                    }

                    draft.forEach((option, i) => {
                      if (i === index) {
                        option.isSelected = !option.isSelected;
                      } else {
                        option.isSelected = false;
                      }
                    });
                  });

                  errorMessageVisibility.update("hide");
                }}
                type="checkbox"
              />
              <label className="text-lg text-[#2F4858]" htmlFor={option.label}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide13 = () => {
  const { setInputNode } = useFocusFirstInput(12);

  const { healthIssues } = UserEnteredDataCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Do you consider yourself to have any physical health issues or medical conditions, e.g ASD, Asthma or allergies, ?"
        subheading="If yes, please provide us with some detail."
        questionNumber={10}
      >
        <textarea
          className="w-full resize-none border-b border-b-[#2F4858] text-lg text-[#2F4858]"
          value={healthIssues.value}
          onChange={(e) => healthIssues.update(e.currentTarget.value)}
          placeholder="Enter health issues here"
          ref={setInputNode}
        />
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide14 = () => {
  const { setInputNode } = useFocusFirstInput(13);

  const { lifeSavingMedications } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Do you require any regular life saving medication, e.g inhalers, epipen or other?"
        subheading="If yes, please provide us with some detail. If no, please type 'no'"
        questionNumber={11}
        errorText="Please enter details or type 'no'"
        isRequired
      >
        <textarea
          className="w-full resize-none border-b border-b-[#2F4858] text-lg text-[#2F4858]"
          value={lifeSavingMedications.value}
          onChange={(e) => {
            lifeSavingMedications.update(e.currentTarget.value);

            errorMessageVisibility.update("hide");
          }}
          placeholder="Enter life saving medication here"
          ref={setInputNode}
        />
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide15 = () => {
  const { events } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Which programmes and workshops are you interested in and would like some more information about?"
        questionNumber={12}
        errorText="Please select at least one option."
        isRequired
      >
        <div className="mt-md flex flex-col gap-xs">
          {events.value.map((option) => (
            <div className="flex items-center gap-sm" key={option.label}>
              <input
                id={option.label}
                checked={option.isSelected}
                onChange={(e) => {
                  const name = e.currentTarget.id;

                  events.update((draft) => {
                    const index = draft.findIndex(
                      (option) => option.label === name,
                    );

                    if (index < 0) {
                      return;
                    }

                    draft[index].isSelected = !draft[index].isSelected;
                  });

                  errorMessageVisibility.update("hide");
                }}
                type="checkbox"
              />
              <label className="text-lg text-[#2F4858]" htmlFor={option.label}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide16 = () => {
  const { setInputNode } = useFocusFirstInput(15);

  const { hopeToGet } = UserEnteredDataCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="What do you hope to get out of going to The Birch Collective's sessions or programmes?"
        questionNumber={13}
      >
        <textarea
          className="w-full resize-none border-b border-b-[#2F4858] text-lg text-[#2F4858]"
          value={hopeToGet.value}
          onChange={(e) => hopeToGet.update(e.currentTarget.value)}
          placeholder="Enter what you hope to get here"
          ref={setInputNode}
        />
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide17 = () => {
  const { setInputNode } = useFocusFirstInput(16);

  const { referralInfo } = UserEnteredDataCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="For referrals from professionals"
        subheading="Any additional information you think is important to share about your client?"
        questionNumber={14}
      >
        <textarea
          className="w-full resize-none border-b border-b-[#2F4858] text-lg text-[#2F4858]"
          value={referralInfo.value}
          onChange={(e) => referralInfo.update(e.currentTarget.value)}
          placeholder="Referral additional info here"
          ref={setInputNode}
        />
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide18 = () => {
  const { sources } = UserEnteredDataCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="How did you hear about The Birch Collective"
        subheading="Tick all that apply."
        questionNumber={15}
      >
        <div className="mt-md flex flex-col gap-xs">
          {sources.value.entries.map((option) => (
            <div key={option.label}>
              <div className="flex items-center gap-sm">
                <input
                  id={option.label}
                  checked={option.isSelected}
                  onChange={(e) => {
                    const label = e.currentTarget.id;

                    sources.update((draft) => {
                      const index = draft.entries.findIndex(
                        (option) => option.label === label,
                      );

                      if (index < 0) {
                        return;
                      }

                      draft.entries[index].isSelected =
                        !draft.entries[index].isSelected;
                    });
                  }}
                  type="checkbox"
                />
                <label
                  className="text-lg text-[#2F4858]"
                  htmlFor={option.label}
                >
                  {option.label}
                </label>
              </div>

              {option.label === "GP or other medical professional" &&
              option.isSelected ? (
                <div className="mb-xs mt-xs pl-lg">
                  <input
                    className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
                    value={sources.value.medicalProDetails}
                    onChange={(e) => {
                      const value = e.currentTarget.value;

                      if (value) {
                        sources.update((draft) => {
                          draft.medicalProDetails = value;
                        });
                      }
                    }}
                    type="text"
                    placeholder="Enter medical professional details"
                  />
                  <p className="mt-xs text-sm text-gray-500">
                    Please give name, organisation and email address if you can.
                  </p>
                </div>
              ) : null}

              {option.label === "Other" && option.isSelected ? (
                <div className="mt-xs pl-lg">
                  <input
                    className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
                    value={sources.value.otherDetails}
                    onChange={(e) => {
                      const value = e.currentTarget.value;

                      if (value) {
                        sources.update((draft) => {
                          draft.otherDetails = value;
                        });
                      }
                    }}
                    type="text"
                    placeholder="Enter details"
                  />
                  <p className="mt-xs text-sm text-gray-500">
                    Please give any details you can.
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide19 = () => {
  const { receiveNewsLetter } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Would you like to be added to the Birch Collectives monthly newsletter to hear about new workshops, programmes and services we are running?"
        questionNumber={16}
        errorText="Oops...please select one of the options"
        isRequired
      >
        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-xs">
            <input
              id="news-yes"
              checked={receiveNewsLetter.value === true}
              onChange={() => {
                receiveNewsLetter.update(true);

                errorMessageVisibility.update("hide");
              }}
              type="checkbox"
            />

            <label className="text-lg text-[#2F4858]" htmlFor="news-yes">
              Yes
            </label>
          </div>

          <div className="flex items-center gap-xs">
            <input
              id="news-no"
              checked={receiveNewsLetter.value === false}
              onChange={() => {
                receiveNewsLetter.update(false);

                errorMessageVisibility.update("hide");
              }}
              type="checkbox"
            />

            <label htmlFor="news-no" className="text-lg text-[#2F4858]">
              No
            </label>
          </div>
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide20 = () => {
  const { imagePermission } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Do you give The Birch Collective permission to take photographs or videos of you with the intention to use in publicity materials?"
        subheading="They'll be used in e.g. social media sites, website, reporting to funders, newspapers and magazine articles. Images will not be given to third parties."
        questionNumber={17}
        errorText="Oops...please select one of the options"
        isRequired
      >
        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-xs">
            <input
              id="image-yes"
              checked={imagePermission.value === true}
              onChange={() => {
                imagePermission.update(true);

                errorMessageVisibility.update("hide");
              }}
              type="checkbox"
            />

            <label className="text-lg text-[#2F4858]" htmlFor="image-yes">
              Yes
            </label>
          </div>

          <div className="flex items-center gap-xs">
            <input
              id="image-no"
              checked={imagePermission.value === false}
              onChange={() => {
                imagePermission.update(false);

                errorMessageVisibility.update("hide");
              }}
              type="checkbox"
            />

            <label htmlFor="image-no" className="text-lg text-[#2F4858]">
              No
            </label>
          </div>
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const Slide21 = () => {
  const { fresh_air_thursday_text_opt_in_Permission } = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  return (
    <SlideWrapper>
      <InputSlideWrapper
        heading="Would you like to be added to a weekly text update/reminder telling you what's going on at Fresh Air Thursday?"
        subheading="You can be removed at anytime by simply replying STOP"
        questionNumber={18}
        errorText="Oops...please select one of the options"
        isRequired
      >
        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-xs">
            <input
              id="image-yes"
              checked={fresh_air_thursday_text_opt_in_Permission.value === true}
              onChange={() => {
                fresh_air_thursday_text_opt_in_Permission.update(true);

                errorMessageVisibility.update("hide");
              }}
              type="checkbox"
            />

            <label className="text-lg text-[#2F4858]" htmlFor="image-yes">
              Yes
            </label>
          </div>

          <div className="flex items-center gap-xs">
            <input
              id="fresh-text-no"
              checked={
                fresh_air_thursday_text_opt_in_Permission.value === false
              }
              onChange={() => {
                fresh_air_thursday_text_opt_in_Permission.update(false);

                errorMessageVisibility.update("hide");
              }}
              type="checkbox"
            />

            <label htmlFor="fresh-text-no" className="text-lg text-[#2F4858]">
              No
            </label>
          </div>
        </div>
      </InputSlideWrapper>
    </SlideWrapper>
  );
};

const optionsToStr = (options: { label: string; isSelected: boolean }[]) => {
  const selected = options
    .filter((o) => o.isSelected)
    .map((o) => o.label)
    .join(",");

  return selected;
};

const Slide22 = () => {
  const { notifyEmails } = ComponentApiCx.use();
  const { submitFormStatus } = FormCx.use();

  const {
    address,
    dob,
    email,
    emergencyContact,
    ethnicity,
    events,
    genders,
    healthIssues,
    hopeToGet,
    identities,
    imagePermission,
    lifeSavingMedications,
    name,
    phoneNumber,
    receiveNewsLetter,
    referralInfo,
    sources,
  } = UserEnteredDataCx.use();

  const handleSubmitForm = () => {
    submitFormStatus.update("loading");

    const identitiesStr = optionsToStr(identities.value);
    const gendersStr = optionsToStr(genders.value);
    const eventsStr = optionsToStr(events.value);

    // status field to be left empty
    const data = {
      status: "",
      name: name.value,
      date_of_birth: `${dob.value.day}/${dob.value.month}/${dob.value.year}`,
      email: email.value,
      phone_number: phoneNumber.value,
      address: `line1:${address.value.line1} | line2: ${address.value.line2} | town/city: ${address.value.townOrcity} | postcode: ${address.value.postcode}`,
      emergency_contact: `name:${emergencyContact.value.name} | phone number: ${emergencyContact.value.phoneNumber} | relationship: ${emergencyContact.value.relationship}`,
      identities: identitiesStr,
      ethnicity: ethnicity.value,
      genders: gendersStr,
      health_issues: healthIssues.value,
      life_saving_medications: lifeSavingMedications.value,
      events: eventsStr,
      hope_to_get: hopeToGet.value,
      pro_referral_additional_info: referralInfo.value,
      sources: `${optionsToStr(
        sources.value.entries,
      )} | medical professional details: ${
        sources.value.medicalProDetails
      } | other details: ${sources.value.otherDetails}`,
      newsletter_opt_in: receiveNewsLetter ? "yes" : "no",
      image_opt_in: imagePermission ? "yes" : "no",
      fresh_air_thursday_text_opt_in: "",
    };

    if (!isDevMode) {
      void fetch("/api/sheets", {
        method: "POST",
        body: JSON.stringify(data),
      });
    }

    void formsubmit.notifySignUp({ emails: notifyEmails });

    setTimeout(() => {
      submitFormStatus.update("success");
    }, 500);
  };

  return (
    <SlideWrapper>
      <div className="">
        <div className="mt-lg text-center  text-gray-400">
          To finish, click submit:
        </div>

        <div className="mt-lg text-center">
          <div
            className="inline-flex cursor-pointer items-center gap-xs rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white"
            onClick={handleSubmitForm}
          >
            <span>Submit</span>
          </div>
        </div>

        <div className="mt-lg text-center text-xl text-[#2F4858]">
          Thanks for taking the time to get in touch with us. One of the Birch
          team will be in touch with you shortly about the next steps in joining
          our programmes.
        </div>
      </div>
    </SlideWrapper>
  );
};

export const slides = [
  <SwiperSlide key="welcome">
    <Slide1 />
  </SwiperSlide>,
  <SwiperSlide key="confidentiality">
    <Slide2 />
  </SwiperSlide>,
  <SwiperSlide key="gdpr">
    <Slide3 />
  </SwiperSlide>,
  <SwiperSlide key="name">
    <Slide4 />
  </SwiperSlide>,
  <SwiperSlide key="dob">
    <Slide5 />
  </SwiperSlide>,
  <SwiperSlide key="email">
    <Slide6 />
  </SwiperSlide>,
  <SwiperSlide key="phoneNumber">
    <Slide7 />
  </SwiperSlide>,
  <SwiperSlide key="address">
    <Slide8 />
  </SwiperSlide>,
  <SwiperSlide key="emergencyContact">
    <Slide9 />
  </SwiperSlide>,
  <SwiperSlide key="identities">
    <Slide10 />
  </SwiperSlide>,
  <SwiperSlide key="ethnicity">
    <Slide11 />
  </SwiperSlide>,
  <SwiperSlide key="genders">
    <Slide12 />
  </SwiperSlide>,
  <SwiperSlide key="healthIssues">
    <Slide13 />
  </SwiperSlide>,
  <SwiperSlide key="lifeSavingMedications">
    <Slide14 />
  </SwiperSlide>,
  <SwiperSlide key="events">
    <Slide15 />
  </SwiperSlide>,
  <SwiperSlide key="hopeToGet">
    <Slide16 />
  </SwiperSlide>,
  <SwiperSlide key="referralInfo">
    <Slide17 />
  </SwiperSlide>,
  <SwiperSlide key="sources">
    <Slide18 />
  </SwiperSlide>,
  <SwiperSlide key="receiveNewsLetter">
    <Slide19 />
  </SwiperSlide>,
  <SwiperSlide key="imagePermission">
    <Slide20 />
  </SwiperSlide>,
  <SwiperSlide key="freshAirThursdayTextPermission">
    <Slide21 />
  </SwiperSlide>,
  <SwiperSlide key="submit">
    <Slide22 />
  </SwiperSlide>,
];

type SlideMeta = {
  type: "info" | "input";
  buttonText?: string;
  id: SlideId;
  isRequired?: boolean;
  errorText?: string;
};

export const slidesMeta: SlideMeta[] = [
  { type: "info", buttonText: slide1ButtonText, id: "welcome" },
  {
    type: "info",
    buttonText: slide2ButtonText,
    id: "confidentiality",
  },
  { type: "info", buttonText: slide3ButtonText, id: "gdpr" },
  {
    type: "input",
    id: "name",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please enter your full name",
  },
  {
    type: "input",
    id: "dob",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please enter a valid date.",
  },
  {
    type: "input",
    id: "email",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please enter a valid email.",
  },
  {
    type: "input",
    id: "phoneNumber",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please enter a valid phone number.",
  },
  {
    type: "input",
    id: "address",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please fill in line1, address and postcode.",
  },
  {
    type: "input",
    id: "emergencyContact",
    isRequired: true,
    buttonText: "Next",
    errorText: "Please provide contact details.",
  },
  {
    type: "input",
    id: "identities",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please enter one of the options",
  },
  {
    type: "input",
    id: "ethnicity",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please provide an answer",
  },
  {
    type: "input",
    id: "genders",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please select one of the options",
  },
  {
    type: "input",
    id: "healthIssues",
    isRequired: false,
    buttonText: "Next",
  },
  {
    type: "input",
    id: "lifeSavingMedications",
    isRequired: true,
    buttonText: "Next",
    errorText: "Please enter details or type 'no'",
  },
  {
    type: "input",
    id: "events",
    isRequired: true,
    buttonText: "Next",
    errorText: "Please select at least one option.",
  },
  {
    type: "input",
    id: "hopeToGet",
    isRequired: false,
    buttonText: "Next",
    errorText: "",
  },
  {
    type: "input",
    id: "referralInfo",
    isRequired: false,
    buttonText: "Next",
    errorText: "",
  },
  {
    type: "input",
    id: "sources",
    isRequired: false,
    buttonText: "Next",
    errorText: "",
  },
  {
    type: "input",
    id: "receiveNewsLetter",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please select one of the options",
  },
  {
    type: "input",
    id: "imagePermission",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please select one of the options",
  },
  {
    type: "input",
    id: "freshAirThursdayTextPermission",
    isRequired: true,
    buttonText: "Next",
    errorText: "Oops...please select one of the options",
  },
  { type: "info", id: "submit" },
];
