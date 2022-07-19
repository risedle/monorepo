import "@testing-library/jest-dom/extend-expect";
import Home from "../../../pages/index";
import { render, screen, waitFor, debug } from "@testing-library/react";
import { fireResizeEvent } from "../../utils/fireResizeEvent";

describe("Given a user visit /", () => {
    beforeEach(async () => {
        await fireResizeEvent(1440);
        render(<Home />);
    });

    describe("When they use screen smaller than a tablet (min-width: 680px)", () => {
        beforeEach(async () => {
            await fireResizeEvent(375);
        });

        it("NavigationBar should be rendered", () => {
            const navigationBar = screen.getByTestId("NavigationBar");
            expect(navigationBar).toBeInTheDocument();
        });

        it("NavigationBarLogoIcon should be rendered", () => {
            const navigationBarLogoIcon = screen.getByTestId(
                "NavigationBarLogoIcon"
            );
            expect(navigationBarLogoIcon).toBeInTheDocument();
        });

        it("NavigationBarLogoText should not be rendered", () => {
            const navigationBarLogoText = screen.queryByTestId(
                "NavigationBarLogoText"
            );
            expect(navigationBarLogoText).not.toBeInTheDocument();
        });
    });

    describe("When they use screen larger than a tablet (min-width: 680px)", () => {
        beforeEach(async () => {
            await fireResizeEvent(720);
        });

        it("NavigationBar should be rendered", () => {
            const navigationBar = screen.getByTestId("NavigationBar");
            expect(navigationBar).toBeInTheDocument();
        });

        it("NavigationBarLogoIcon should be rendered", () => {
            const navigationBarLogoIcon = screen.getByTestId(
                "NavigationBarLogoIcon"
            );
            expect(navigationBarLogoIcon).toBeInTheDocument();
        });

        it("NavigationBarLogoText should be rendered", async () => {
            await waitFor(() => {
                const navigationBarLogoText = screen.queryByTestId(
                    "NavigationBarLogoText"
                );
                expect(navigationBarLogoText).toBeInTheDocument();
            });
        });
    });
});
