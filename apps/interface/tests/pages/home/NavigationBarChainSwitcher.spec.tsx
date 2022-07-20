import "@testing-library/jest-dom/extend-expect";
import nextRouter from "next/router";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderApp } from "../../utils/renderApp";

import Home from "../../../pages/index";

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
        renderApp(<Home />);
    });

    it("should popup when clicked", async () => {
        const chainSwitcher = screen.getByTestId("NavigationBarChainSwitcher");

        fireEvent.click(chainSwitcher);

        await waitFor(() => {
            const popup = screen.getByTestId(
                "NavigationBarChainSwitcherPopup"
            );
            expect(popup).toBeVisible();
        });
    });
});