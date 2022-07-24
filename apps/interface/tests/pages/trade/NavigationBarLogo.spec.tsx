import { render, screen } from "@testing-library/react";
import nextRouter from "next/router";

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
        render(<Trade prices={[]} />);
    });

    it("NavigationBar should be rendered", () => {
        const navigationBar = screen.getByTestId("NavigationBar");
        expect(navigationBar).toBeInTheDocument();
    });
});
