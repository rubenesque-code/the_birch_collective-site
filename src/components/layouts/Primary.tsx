import { ReactNode } from "react";

import { Footer, FooterProps, Header } from "../parts";

export const Primary = ({
  children,
  childComponentProps,
}: {
  children: ReactNode;
  childComponentProps: {
    footer: FooterProps;
  };
}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer {...childComponentProps.footer} />
    </div>
  );
};
