import React from "react";
import { useMeasure, usePrevious, useWindowSize } from "@react-hookz/web";
import { useWindowScroll } from "react-use";

import { Footer, Header } from "~/components/sections";
import Ui from "~/components/ui-elements";

import { type CommonData } from "~/pre-render-helpers/types";

export const PageFrame = ({
  footer,
  header,
  linkLabels,
  logoImage,
  orgDetails,
  children: pageBody,
  head,
}: {
  children: React.ReactNode | React.ReactNode[];
  head: React.ReactElement;
} & CommonData) => {
  const [headerMeasurements, headerRef] = useMeasure<HTMLDivElement>();

  const headerHeight = headerMeasurements?.height;

  const { y: currentY } = useWindowScroll();
  const previousY = usePrevious(currentY);

  const scrollDirection = !previousY || previousY < currentY ? "down" : "up";

  const windowSize = useWindowSize();

  const headerOffscreen =
    windowSize.height < 769 &&
    scrollDirection === "down" &&
    currentY > (headerHeight ? headerHeight * 3 : 100);

  return (
    <>
      {head}

      <div
        className={`fixed left-0 top-0 z-50 w-full bg-white transition-transform duration-300 ease-in-out ${
          headerOffscreen ? "-translate-y-full" : ""
        }`}
        ref={headerRef}
      >
        <Header
          staticData={{
            header: header,
            linkLabels: linkLabels,
            orgDetails: orgDetails,
            logoImg: logoImage,
          }}
        />
      </div>

      {headerHeight ? (
        <div
          className="w-screen overflow-y-auto overflow-x-hidden"
          style={{
            height: `calc(100vh - ${headerHeight}px)`,
            transform: `translateY(${headerHeight}px)`,
          }}
        >
          {pageBody}

          <Ui.Page.VerticalSpace sizing="double" />

          <Ui.Page.HorizontalSpace>
            <Footer
              footer={footer}
              linkLabels={linkLabels}
              logoImg={logoImage}
              orgDetails={orgDetails}
            />
          </Ui.Page.HorizontalSpace>

          <Ui.Page.VerticalSpace />
        </div>
      ) : null}
    </>
  );
};

/* export const PageFrame = ({
  footer,
  header,
  linkLabels,
  logoImage,
  orgDetails,
  children: pageBody,
  head,
}: {
  children: React.ReactNode | React.ReactNode[];
  head: React.ReactElement;
} & CommonData) => {
  return (
    <>
      {head}

      <div className="w-screen overflow-hidden">
        <Header
          staticData={{
            header: header,
            linkLabels: linkLabels,
            orgDetails: orgDetails,
            logoImg: logoImage,
          }}
        />

        {pageBody}

        <Ui.Page.VerticalSpace sizing="double" />

        <Ui.Page.HorizontalSpace>
          <Ui.Page.VerticalSpace />

          <Footer
            footer={footer}
            linkLabels={linkLabels}
            logoImg={logoImage}
            orgDetails={orgDetails}
          />
        </Ui.Page.HorizontalSpace>

        <Ui.Page.VerticalSpace />
      </div>
    </>
  );
}; */
