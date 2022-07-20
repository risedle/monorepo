import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import nextRouter from "next/router";

import Home from "../../../pages/index";

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
});
