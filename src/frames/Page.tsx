import React from "react";

import Footer from "~/components/sections/footer/+Entry";
import Header from "~/components/sections/header";
import Ui from "~/components/ui-elements";

import { type CommonData } from "~/pre-render-helpers/types";

export const PageFrame = ({
  footer,
  header,
  linkLabels,
  logoImage,
  orgDetails,
  children,
}: { children: React.ReactNode | React.ReactNode[] } & CommonData) => (
  <div className="w-screen overflow-x-hidden">
    <Header
      staticData={{
        header: header,
        linkLabels: linkLabels,
        orgDetails: orgDetails,
        logoImg: logoImage,
      }}
    />

    {children}

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
);
