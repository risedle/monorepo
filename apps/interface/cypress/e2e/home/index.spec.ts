describe("My First Test", () => {
    it("Visits the Kitchen Sink", () => {
        cy.visit("/");
        cy.title().should("eq", "Trade Leveraged Tokens | Risedle");
    });
});
