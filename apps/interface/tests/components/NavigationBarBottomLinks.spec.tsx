import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { NavigationBarBottomLinks } from "@/components/NavigationBarBottom/links";

describe("<NavigationBarBottomLink />", () => {
    describe("When not clicked", () => {
        it("should render <HamburgerIcon />", () => {
            render(<NavigationBarBottomLinks />);

            const Hamburger = screen.queryByTestId("HamburgerIcon");
            expect(Hamburger).toBeInTheDocument();
            const Close = screen.queryByTestId("CloseIcon");
            expect(Close).not.toBeInTheDocument();
        });
    });

    describe("When clicked", () => {
        it("should render <CloseIcon />", async () => {
            render(<NavigationBarBottomLinks />);
            const button = screen.getByTestId("NavigationBarBottomLinks");
            fireEvent.click(button);

            await waitFor(() => {
                const Hamburger = screen.queryByTestId("HamburgerIcon");
                expect(Hamburger).not.toBeInTheDocument();
                const Close = screen.queryByTestId("CloseIcon");
                expect(Close).toBeInTheDocument();
            });
        });
    });
});
