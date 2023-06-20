/// <reference types="cypress" />

describe("database", () => {
  it("data is fetched", () => {
    cy.visit("http://localhost:3000");

    cy.get("[test-id=header]").within(() => {
      cy.get("[test-id=org-label]").should("have.text", "the birch collective");
    });
  });
});
