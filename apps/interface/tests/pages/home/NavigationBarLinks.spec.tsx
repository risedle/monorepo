import "@testing-library/jest-dom/extend-expect";
import Home from "../../../pages/index";
import { render, screen, waitFor, debug } from "@testing-library/react";
import { fireResizeEvent } from "../../utils/fireResizeEvent";

describe("Given a user visit /", () => {
    beforeEach(async () => {
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
        expect(navigationBarLinksTrade).toHaveAttribute("href", "/trade");
        expect(navigationBarLinksTrade).toHaveClass(
            "text-gray-light-12 dark:text-gray-dark-12"
        );
    });

    it("NavigationBarLinksEarn should be rendered", () => {
        const navigationBarLinksEarn = screen.getByTestId(
            "NavigationBarLinksEarn"
        );
        expect(navigationBarLinksEarn).toBeInTheDocument();
        expect(navigationBarLinksEarn).toHaveAttribute("href", "/pools");
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
