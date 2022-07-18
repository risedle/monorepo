import * as BaseConfig from "../../../utils/getBaseConfig";

describe("Given a user visit /", () => {
    describe("When chainId is BNB Smart Chain", () => {
        before(() => {
            // TODO: mmock BNB smart chain here
            cy.visit("/");
        });

        it("WarningBar should render BSC icon", () => {
            cy.get("[data-testid=ChainIconBSC]").should("be.visible");
        });

        it("WarningBar should have class 'overflow-x-hidden'", () => {
            cy.get("[data-testid=WarningBar]").should(
                "have.class",
                "overflow-x-hidden"
            );
        });

        describe("When the screen width is 375px", () => {
            it("WarningBarContent should equal to 2", () => {
                cy.viewport(375, 720);
                cy.get("[data-testid=WarningBar]")
                    .find("[data-testid=WarningBarContent]")
                    .should("have.length", 2);
            });
        });

        describe("When the screen width is 1440px", () => {
            it("WarningBarContent should equal to 4", () => {
                cy.viewport(1440, 720);
                cy.get("[data-testid=WarningBar]")
                    .find("[data-testid=WarningBarContent]")
                    .should("have.length", 4);
            });
        });
    });

    describe("Given random chainId", () => {
        before(() => {});

        it("WarningBar should render default icon", () => {
            cy.window().then((win) => {
                cy.stub(BaseConfig, "getBaseConfig", () => {
                    return { chainId: 100 };
                });
                console.log("DEBUG: win", win);
                cy.visit("/");
                cy.get("[data-testid=ChainIconDefault]").should("be.visible");
            });
        });
    });
});
