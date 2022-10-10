import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import NavigationBar from "@/components/NavigationBar";
import nextRouter from "next/router";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<NavigationBar />", () => {
    describe("Given a user visit /", () => {
        it("should render 'Trade' link as active", () => {
            const useRouter = jest.spyOn(nextRouter, "useRouter");
            useRouter.mockImplementation(() => ({
                route: "/",
                pathname: "/",
            }));
            render(<NavigationBar />);

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
    });

    describe("Given a user visit /earn", () => {
        it("should render 'Earn' link as active", () => {
            const useRouter = jest.spyOn(nextRouter, "useRouter");
            useRouter.mockImplementation(() => ({
                route: "/earn",
                pathname: "/earn",
            }));
            render(<NavigationBar />);

            const navigationBarLinksEarn = screen.getByTestId(
                "NavigationBarLinksEarn"
            );
            expect(navigationBarLinksEarn).toBeInTheDocument();
            expect(navigationBarLinksEarn).toHaveAttribute(
                "href",
                "https://app.midascapital.xyz/56/pool/6"
            );
            // expect(navigationBarLinksEarn).toHaveAttribute(
            //     "data-state",
            //     "active"
            // );
        });
    });

    describe("Given a user visit /portfolio", () => {
        it("should render 'Portfolio' link as active", () => {
            const useRouter = jest.spyOn(nextRouter, "useRouter");
            useRouter.mockImplementation(() => ({
                route: "/portfolio",
                pathname: "/portfolio",
            }));
            render(<NavigationBar />);

            const navigationBarLinksPortfolio = screen.getByTestId(
                "NavigationBarLinksPortfolio"
            );
            expect(navigationBarLinksPortfolio).toBeInTheDocument();
            expect(navigationBarLinksPortfolio).toHaveAttribute(
                "href",
                "/portfolio"
            );
            expect(navigationBarLinksPortfolio).toHaveAttribute(
                "data-state",
                "active"
            );
        });
    });
});
