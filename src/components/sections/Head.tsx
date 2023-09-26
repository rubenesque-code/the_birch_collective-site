import React from "react";
import NextHead from "next/head";

export const Head = ({ children }: { children?: React.ReactNode }) => (
  <NextHead>
    <title>
      Birch Collective | Bristol based social enterprise connecting young people
      to the natural world
    </title>
    <link rel="icon" href="/icon.ico" />
    <meta name="robots" content="all" key="robots" />
    <meta
      name="description"
      content="For young people experiencing mental health difficulties. We have a range of enriching outdoor experiences. We're supported by charitable trusts."
    />
    {children}
  </NextHead>
);
