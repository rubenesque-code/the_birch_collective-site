import React from "react";

import { Footer } from "./index";

describe("<Footer />", () => {
  it("renders with populated child components", () => {
    cy.mount(
      <Footer
        siteLinkLabels={{
          about: "about",
          donate: "donate",
          programmes: "programmes",
          volunteer: "volunteer",
          workshops: "workshops",
        }}
      />,
    );

    // Test has facebook logo

    cy.get("[test-id=facebook]")
      .should("have.prop", "tagName")
      .should("eq", "A");
  });
});
