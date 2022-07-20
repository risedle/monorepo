import "@testing-library/jest-dom/extend-expect";
import Home from "../../../pages/index";
import { render, screen } from "@testing-library/react";
import nextRouter from "next/router";

describe("Given a user visit /", () => {
    beforeEach(async () => {
        const useRouter = jest.spyOn(nextRouter, "useRouter");
        useRouter.mockImplementation(() => ({
            route: "/",
            pathname: "/",
        }));
        render(<Home />);
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
        expect(navigationBarLinksTrade).toHaveAttribute(
            "data-state",
            "active"
        );
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
