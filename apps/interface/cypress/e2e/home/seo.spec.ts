describe("Given a robot visit /", () => {
    describe("When they scrap the meta tags", () => {
        before(() => {
            cy.visit("/");
        });

        it("Should set <title> correctly", () => {
            cy.title().should(
                "eq",
                "Trade Leveraged Tokens on BNB Smart Chain | Risedle"
            );
        });

        it("Should set <meta description> correctly", () => {
            cy.get('meta[name="description"]').should(
                "have.attr",
                "content",
                "Trade, earn and build on the decentralized crypto leveraged ETFs market protocol"
            );
        });

        it("Should set <link rel='canonical'> correctly", () => {
            cy.get('link[rel="canonical"]').should(
                "have.attr",
                "href",
                "https://risedle.com"
            );
        });

        it("Should set <meta twitter:*> correctly", () => {
            cy.get('meta[name="twitter:card"]').should(
                "have.attr",
                "content",
                "summary_large_image"
            );
            cy.get('meta[name="twitter:site"]').should(
                "have.attr",
                "content",
                "@risedle"
            );
            cy.get('meta[name="twitter:creator"]').should(
                "have.attr",
                "content",
                "@risedle"
            );
        });

        it("Should set <meta og:*> correctly", () => {
            cy.get('meta[property="og:title"]').should(
                "have.attr",
                "content",
                "Trade Leveraged Tokens on BNB Smart Chain | Risedle"
            );
            cy.get('meta[property="og:description"]').should(
                "have.attr",
                "content",
                "Trade, earn and build on the decentralized crypto leveraged ETFs market protocol"
            );
            cy.get('meta[property="og:url"]').should(
                "have.attr",
                "content",
                "https://bsc.risedle.com"
            );
            cy.get('meta[property="og:type"]').should(
                "have.attr",
                "content",
                "website"
            );
            cy.get('meta[property="og:image"]').should(
                "have.attr",
                "content",
                "https://risedle.com/assets/images/og/Landing.png"
            );
            cy.get('meta[property="og:site_name"]').should(
                "have.attr",
                "content",
                "Risedle"
            );
        });

        it("Should set <meta robots> correctly", () => {
            cy.get('meta[name="robots"]').should(
                "have.attr",
                "content",
                "index,follow"
            );
        });
    });
});
