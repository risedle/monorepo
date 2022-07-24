import nextRouter from "next/router";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderApp } from "../../utils/renderApp";

import Trade from "../../../pages/trade/[symbol]";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("Given a user visit /", () => {
    beforeEach(async () => {
        const useRouter = jest.spyOn(nextRouter, "useRouter");
        useRouter.mockImplementation(() => ({
            route: "/trade/ethrise",
            pathname: "/trade/ethrise",
        }));
        renderApp(<Trade prices={[]} />);
    });

    it("should popup when clicked", async () => {
        const chainSwitcher = screen.getAllByTestId("ChainSwitcher")[0];

        fireEvent.click(chainSwitcher);

        await waitFor(() => {
            const popup = screen.getAllByTestId("ChainSwitcherPopup")[0];
            expect(popup).toBeVisible();
        });
    });
});
