import React from "react";
import { useMeasure, useWindowSize } from "@react-hookz/web";
import { usePrevious } from "react-use";

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
  const [scrollElement, setScrollRef] = React.useState<HTMLDivElement | null>(
    null,
  );
  const [currentY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    if (!scrollElement) {
      return;
    }

    const handleScroll = () => {
      const scrollY = scrollElement.scrollTop;

      setScrollY(scrollY);
    };

    scrollElement.addEventListener("scroll", handleScroll);

    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollElement]);

  const previousY = usePrevious(currentY);

  const scrollDirection = !previousY || previousY < currentY ? "down" : "up";

  const windowSize = useWindowSize();

  const [headerMeasurements, headerRef] = useMeasure<HTMLDivElement>();

  const headerHeight = headerMeasurements?.height;

  const hideHeader =
    windowSize.height < 769 &&
    scrollDirection === "down" &&
    currentY > (headerHeight ? headerHeight * 3 : 100);

  return (
    <>
      {head}

      <div
        className={`fixed left-0 top-0 z-50 w-full bg-white transition-transform duration-300 ease-in-out`}
        style={{
          transform:
            hideHeader && headerHeight ? `translateY(-${headerHeight}px)` : "",
        }}
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
          className="w-screen overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out"
          style={{
            height: !hideHeader ? `calc(100vh - ${headerHeight}px)` : "100vh",
            transform: !hideHeader ? `translateY(${headerHeight}px)` : "",
          }}
          ref={setScrollRef}
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
