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
            route: "/trade/ethrise",
            pathname: "/trade/ethrise",
        }));
        renderApp(
            <Trade
                prices={[]}
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

    it("NavigationBarLinks should be rendered", () => {
        const navigationBarLinks = screen.getByTestId("NavigationBarLinks");
        expect(navigationBarLinks).toBeInTheDocument();
    });

    it("NavigationBarLinksTrade should be rendered and in active state", () => {
        const navigationBarLinksTrade = screen.getByTestId(
            "NavigationBarLinksTrade"
        );
        expect(navigationBarLinksTrade).toBeInTheDocument();
        expect(navigationBarLinksTrade).toHaveAttribute("href", "/");
    });

    it("NavigationBarLinksEarn should be rendered", () => {
        const navigationBarLinksEarn = screen.getByTestId(
            "NavigationBarLinksEarn"
        );
        expect(navigationBarLinksEarn).toBeInTheDocument();
        expect(navigationBarLinksEarn).toHaveAttribute("href", "/earn");
    });

    it("NavigationBarLinksPortfolio should be rendered", () => {
        const navigationBarLinksPortfolio = screen.getByTestId(
            "NavigationBarLinksPortfolio"
        );
        expect(navigationBarLinksPortfolio).toBeInTheDocument();
        expect(navigationBarLinksPortfolio).toHaveAttribute(
            "href",
            "/portfolio"
        );
    });
});
