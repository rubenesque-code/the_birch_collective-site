import React from "react";

import { Footer } from "../index";
import "~/styles/globals.css";

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
        orgDetails={{
          contact: {
            address: "address",
            email: "email",
            phoneNumber: "0781",
          },
          socialMediaLinks: {
            facebook: "facb",
            instagram: "insta",
            linkedIn: "linked",
          },
        }}
      />,
    );

    cy.get("[test-id=facebook]")
      .should("have.prop", "tagName")
      .should("eq", "A");

    cy.get("[test-id=instagram]")
      .should("have.prop", "tagName")
      .should("eq", "A");

    cy.get("[test-id=linkedIn]")
      .should("have.prop", "tagName")
      .should("eq", "A");

    cy.get("[test-id=programmes]").should("exist");
    cy.get("[test-id=workshops]").should("exist");
    cy.get("[test-id=donate]").should("exist");
    cy.get("[test-id=volunteer]").should("exist");
    cy.get("[test-id=about-us]").should("exist");

    cy.get("[test-id=org-info-snippet]").should("exist");

    cy.get("[test-id=org-name-and-logo]").should("exist");
    cy.get("[test-id=phone-number]").should("exist");
    cy.get("[test-id=email]").should("exist");

    cy.get("[test-id=message]").should("have.prop", "href");
  });
});
