import "@testing-library/jest-dom/extend-expect";
import nextRouter from "next/router";
import { setMedia, cleanupMedia } from "mock-match-media";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderApp } from "../../utils/renderApp";

import Home from "../../../pages/index";
jest.mock("@rainbow-me/rainbowkit", () => ({
    ConnectButton: {
        Custom: jest.fn(),
    },
}));

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("Given a user visit /", () => {
    beforeEach(async () => {
        const useRouter = jest.spyOn(nextRouter, "useRouter");
        useRouter.mockImplementation(() => ({
            route: "/",
            pathname: "/",
        }));
    });

    describe("When they use screen smaller than a tablet (min-width: 680px)", () => {
        beforeEach(() => {
            setMedia({ width: "375px" });
            renderApp(<Home />);
        });

        it("NavigationBarChainSwitcher should not be rendered", () => {
            const chainSwitcher = screen.queryByTestId(
                "NavigationBarChainSwitcher"
            );
            expect(chainSwitcher).not.toBeInTheDocument();
        });
    });

    describe("When they use screen larger than a tablet (min-width: 680px)", () => {
        beforeEach(async () => {
            setMedia({ width: "720px" });
            renderApp(<Home />);
        });

        it("NavigationBarChainSwitcher should be rendered", () => {
            const chainSwitcher = screen.queryByTestId(
                "NavigationBarChainSwitcher"
            );
            expect(chainSwitcher).toBeInTheDocument();
        });

        it("should popup when clicked", async () => {
            const chainSwitcher = screen.getByTestId(
                "NavigationBarChainSwitcher"
            );

            fireEvent.click(chainSwitcher);

            await waitFor(() => {
                const popup = screen.getByTestId(
                    "NavigationBarChainSwitcherPopup"
                );
                expect(popup).toBeVisible();
            });
        });
    });
});
