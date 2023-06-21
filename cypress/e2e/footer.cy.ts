// □  message component link

describe("footer", () => {
  it("page links go to the correct page", () => {
    cy.visit("http://localhost:3000");

    cy.get("[test-id=footer]").within(() => {
      cy.get("[test-id=programmes]").click();
      cy.location("pathname").should("eq", "/programmes");

      cy.get("[test-id=workshops]").click();
      cy.location("pathname").should("eq", "/workshops");

      cy.get("[test-id=donate]").click();
      cy.location("pathname").should("eq", "/donate");

      cy.get("[test-id=volunteer]").click();
      cy.location("pathname").should("eq", "/volunteer");

      cy.get("[test-id=about-us]").click();
      cy.location("pathname").should("eq", "/about-us");
    });
  });
});
