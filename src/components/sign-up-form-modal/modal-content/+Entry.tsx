import React from "react";
import { Transition } from "@headlessui/react";

import { Icon } from "~/components/icons";
import { Modal } from "~/components/styled-bases";
import { WithTooltip } from "~/components/WithTooltip";

import Swiper, {
  FormCx,
  slidesMeta,
  SwiperApiCx,
  UserEnteredDataCx,
} from "./swiper";

const ComponentWithProviders = () => (
  <SwiperApiCx.Provider>
    <UserEnteredDataCx.Provider>
      <FormCx.Provider>
        <ModalContent />
      </FormCx.Provider>
    </UserEnteredDataCx.Provider>
  </SwiperApiCx.Provider>
);

export default ComponentWithProviders;

const ModalContent = () => {
  const swiperApi = SwiperApiCx.use();

  const userEnteredData = UserEnteredDataCx.use();

  const { errorMessageVisibility } = FormCx.use();

  const isFirstSlide = swiperApi.currentSlideIndex === 0;
  const isLastSlide = swiperApi.currentSlideIndex === swiperApi.numSlides - 1;

  const checkCurrentSlideValidity = React.useCallback(() => {
    if (slidesMeta[swiperApi.currentSlideIndex].type === "info") {
      return true;
    }
    if (!slidesMeta[swiperApi.currentSlideIndex].isRequired) {
      return true;
    }

    if (slidesMeta[swiperApi.currentSlideIndex].id === "name") {
      return userEnteredData.name.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "dob") {
      return userEnteredData.dob.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "email") {
      return userEnteredData.email.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "phoneNumber") {
      return userEnteredData.phoneNumber.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "emergencyContact") {
      return userEnteredData.emergencyContact.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "identities") {
      return userEnteredData.identities.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "ethnicity") {
      return userEnteredData.ethnicity.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "genders") {
      return userEnteredData.genders.isValid;
    }
    if (
      slidesMeta[swiperApi.currentSlideIndex].id === "lifeSavingMedications"
    ) {
      return userEnteredData.lifeSavingMedications.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "events") {
      return userEnteredData.events.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "receiveNewsLetter") {
      return userEnteredData.receiveNewsLetter.isValid;
    }
    if (slidesMeta[swiperApi.currentSlideIndex].id === "imagePermission") {
      return userEnteredData.imagePermission.isValid;
    }

    return true;
  }, [
    swiperApi.currentSlideIndex,
    userEnteredData.dob.isValid,
    userEnteredData.email.isValid,
    userEnteredData.emergencyContact.isValid,
    userEnteredData.ethnicity.isValid,
    userEnteredData.events.isValid,
    userEnteredData.genders.isValid,
    userEnteredData.identities.isValid,
    userEnteredData.imagePermission.isValid,
    userEnteredData.lifeSavingMedications.isValid,
    userEnteredData.name.isValid,
    userEnteredData.phoneNumber.isValid,
    userEnteredData.receiveNewsLetter.isValid,
  ]);

  const handleGoPrevSlide = React.useCallback(() => {
    const currentSlideIsValid = checkCurrentSlideValidity();

    if (!currentSlideIsValid) {
      errorMessageVisibility.update("show");

      return;
    }

    swiperApi.goToPrevSlide();
  }, [checkCurrentSlideValidity, errorMessageVisibility, swiperApi]);

  const handleGoNextSlide = React.useCallback(() => {
    const currentSlideIsValid = checkCurrentSlideValidity();

    if (!currentSlideIsValid) {
      errorMessageVisibility.update("show");

      return;
    }

    swiperApi.goToNextSlide();
  }, [checkCurrentSlideValidity, errorMessageVisibility, swiperApi]);

  React.useEffect(() => {
    if (!document) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const isEnterKey = event.key === "Enter";
      const isRightArrowKey = event.key === "ArrowRight";

      if (isEnterKey || isRightArrowKey) {
        handleGoNextSlide();
        return;
      }

      const isLeftArrowKey = event.key === "ArrowLeft";

      if (isLeftArrowKey) {
        handleGoPrevSlide();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleGoNextSlide, handleGoPrevSlide]);

  return (
    <>
      <Container
        isLastSlide={isLastSlide}
        isRequired={slidesMeta[swiperApi.currentSlideIndex].isRequired || null}
        errorText={slidesMeta[swiperApi.currentSlideIndex].errorText}
        title={isLastSlide ? null : <Title />}
        swiper={<Swiper />}
        buttons={
          <BottomSection
            prevNextButtons={
              <div className="flex gap-xxs">
                <PrevNextButton
                  type="prev"
                  onClick={handleGoPrevSlide}
                  show={true}
                />
                <PrevNextButton
                  type="next"
                  onClick={handleGoNextSlide}
                  show={!isLastSlide}
                />
              </div>
            }
            subSubmitButtonMessage={
              isFirstSlide ? (
                <div className="absolute -bottom-xs flex w-full translate-y-full justify-center">
                  <div className="flex items-center gap-xxs text-sm text-gray-500">
                    <span>
                      <Icon.Time />
                    </span>
                    <span>Takes 2 minutes</span>
                  </div>
                </div>
              ) : null
            }
            submitButton={
              <SubmitButton
                onClick={handleGoNextSlide}
                show={!isLastSlide}
                text={slidesMeta[swiperApi.currentSlideIndex].buttonText || ""}
              />
            }
          />
        }
      />

      <FormStatusOverlay />
    </>
  );
};

const Container = ({
  title,
  swiper,
  buttons,
  errorText,
  isRequired,
  isLastSlide,
}: {
  title: React.ReactNode;
  swiper: React.ReactNode;
  buttons: React.ReactElement | null;
  errorText?: string;
  isRequired: boolean | null;
  isLastSlide: boolean;
}) => {
  const { errorMessageVisibility } = FormCx.use();

  return (
    <div className="flex h-[90vh] max-h-[400px] w-[80vw] max-w-[600px] flex-col">
      {isLastSlide ? null : title}

      <div className="relative mt-sm max-w-full flex-grow">{swiper}</div>

      {isLastSlide ? null : (
        <div className={`mt-sm flex justify-between`}>
          <p
            className={`text-[#FF8983] ${
              errorText && errorMessageVisibility.value === "show"
                ? ""
                : "invisible"
            }`}
          >
            {errorText}
          </p>

          <p
            className={`shrink-0 italic text-gray-500 transition-opacity ease-in-out ${
              isRequired ? "" : "opacity-0"
            }`}
          >
            required
          </p>
        </div>
      )}

      {!buttons ? null : (
        <div className="relative mt-lg w-full flex-shrink-0">{buttons}</div>
      )}
    </div>
  );
};

const Title = () => (
  <div className="mt-xs flex-shrink-0 text-center font-display text-3xl font-bold tracking-wide text-orangeLight sm:text-4xl md:text-5xl">
    Birch Events
  </div>
);

const BottomSection = ({
  submitButton,
  prevNextButtons,
  subSubmitButtonMessage,
}: {
  submitButton: React.ReactNode;
  prevNextButtons: React.ReactNode;
  subSubmitButtonMessage: React.ReactNode;
}) => (
  <div className="relative flex w-full items-end justify-between">
    <div className="invisible">{prevNextButtons}</div>

    {submitButton}

    {prevNextButtons}

    {subSubmitButtonMessage}
  </div>
);

const SubmitButton = ({
  onClick,
  show,
  text,
}: {
  show: boolean;
  onClick: () => void;
  text: string;
}) => (
  <div
    className={`cursor-pointer rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white transition-opacity ease-in-out ${
      !show ? "pointer-events-none !opacity-0" : ""
    }`}
    onClick={onClick}
  >
    {text}
  </div>
);

const PrevNextButton = ({
  show,
  type,
  onClick,
}: {
  type: "prev" | "next";
  show: boolean;
  onClick: () => void;
}) => (
  <WithTooltip text={type === "prev" ? "previous slide" : "next slide"}>
    <div
      className={`cursor-pointer rounded-sm bg-brandLightOrange text-lg text-white opacity-80 transition-opacity ease-in-out hover:opacity-100 ${
        !show ? "pointer-events-none !opacity-0" : ""
      }`}
      onClick={onClick}
    >
      {type === "prev" ? (
        <Icon.CaretLeft weight="bold" />
      ) : (
        <Icon.CaretRight weight="bold" />
      )}
    </div>
  </WithTooltip>
);

const FormStatusOverlay = () => {
  const { closeModal } = Modal.VisibilityCx.use();

  const {
    submitFormStatus: { value: status },
  } = FormCx.use();

  if (status === "idle") {
    return null;
  }

  return (
    <Transition
      show={status === "loading" || status === "success"}
      as="div"
      className="absolute left-0 top-0 z-20 grid h-full w-full place-items-center rounded-xl bg-white/90 text-lg font-medium"
      enter="transition duration-300 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-500 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <div className={`flex flex-col items-center leading-loose text-gray-700`}>
        <p className={`mt-sm text-center`}>
          {status === "loading" ? (
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
            className="mt-md rounded-md border border-brandOrange bg-white px-sm font-bold text-brandGreen transition-all duration-75 ease-in-out hover:bg-gray-100"
            onClick={closeModal}
            type="button"
          >
            Ok
          </button>
        ) : null}
      </div>
    </Transition>
  );
};
