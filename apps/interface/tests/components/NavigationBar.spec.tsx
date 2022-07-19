import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { NavigationBar } from "../../components/NavigationBar";

describe("<NavigationBar />", () => {
    describe("Given trade link as active", () => {
        it("should render trade link as active", () => {
            render(<NavigationBar tradeActive />);
            const navigationBarLinksTrade = screen.getByTestId(
                "NavigationBarLinksTrade"
            );
            expect(navigationBarLinksTrade).toBeInTheDocument();
            expect(navigationBarLinksTrade).toHaveAttribute("href", "/trade");
            expect(navigationBarLinksTrade).toHaveClass(
                "text-gray-light-12 dark:text-gray-dark-12"
            );
        });
    });

    describe("Given earn link as active", () => {
        it("should render earn link as active", () => {
            render(<NavigationBar earnActive />);
            const navigationBarLinksEarn = screen.getByTestId(
                "NavigationBarLinksEarn"
            );
            expect(navigationBarLinksEarn).toBeInTheDocument();
            expect(navigationBarLinksEarn).toHaveAttribute("href", "/pools");
            expect(navigationBarLinksEarn).toHaveClass(
                "text-gray-light-12 dark:text-gray-dark-12"
            );
        });
    });

    describe("Given portfolio link as active", () => {
        it("should render portfolio link as active", () => {
            render(<NavigationBar portfolioActive />);
            const navigationBarLinksPortfolio = screen.getByTestId(
                "NavigationBarLinksPortfolio"
            );
            expect(navigationBarLinksPortfolio).toBeInTheDocument();
            expect(navigationBarLinksPortfolio).toHaveAttribute(
                "href",
                "/portfolio"
            );
            expect(navigationBarLinksPortfolio).toHaveClass(
                "text-gray-light-12 dark:text-gray-dark-12"
            );
        });
    });
});
