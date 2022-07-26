import { screen } from "@testing-library/react";
import nextRouter from "next/router";

import renderApp from "../../utils/renderApp";
import Trade from "../../../pages/trade/[symbol]";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("Given a user visit /", () => {
    beforeEach(async () => {
        const useRouter = jest.spyOn(nextRouter, "useRouter");
        useRouter.mockImplementation(() => ({
            route: "/trade/bnbdrop",
            pathname: "/trade/bnbdrop",
        }));
        renderApp(
            <Trade
                prices={[]}
                backings={[]}
                address="0xec448Dcb1FF0A8724EA8cF5c5348d88207d6e9D9"
                collateral={{ symbol: "A" }}
                debt={{ symbol: "A" }}
            />
        );
    });

    it("NavigationBar should be rendered", () => {
        const navigationBar = screen.getByTestId("NavigationBar");
        expect(navigationBar).toBeInTheDocument();
    });
});
