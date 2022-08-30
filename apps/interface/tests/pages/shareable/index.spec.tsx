import "@testing-library/jest-dom/extend-expect";
import nextRouter from "next/router";
import { render, screen } from "@testing-library/react";
import Shareable from "@/pages/shareable";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<Shareable />", () => {
    describe("Given a user visit /shareable", () => {
        it("should render shareable page content", () => {
            const useRouter = jest.spyOn(nextRouter, "useRouter");
            useRouter.mockImplementation(() => ({
                route: "/shareable",
                pathname: "/shareable",
            }));
            render(<Shareable />);

            const insightGeneratorContent =
                screen.getByTestId("InsightGenerator");
            expect(insightGeneratorContent).toBeInTheDocument();
        });
    });
});
