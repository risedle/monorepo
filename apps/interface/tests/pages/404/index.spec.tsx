import "@testing-library/jest-dom/extend-expect";
import nextRouter from "next/router";
import { render, screen } from "@testing-library/react";
import Custom404 from "@/pages/404";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<Custom404 />", () => {
    describe("Given a user visit /{{unknown}}", () => {
        it("should render custom 404 page", () => {
            const useRouter = jest.spyOn(nextRouter, "useRouter");
            useRouter.mockImplementation(() => ({
                route: "/unknown",
                pathname: "/unknown",
            }));
            render(<Custom404 />);

            const backToHomeLink = screen.getByTestId("BackToHomeLink");
            expect(backToHomeLink).toBeInTheDocument();
            expect(backToHomeLink).toHaveAttribute("href", "/");
        });
    });
});
