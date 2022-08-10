import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderApp from "../utils/renderApp";

import { DarkmodeToggle } from "@/components/DarkmodeToggle";

describe("Given <DarkmodeToggle /> is rendered", () => {
    beforeEach(() => {
        renderApp(<DarkmodeToggle />);
    });

    it("should render lightmode icon by default", () => {
        const lightmodeIcon = screen.queryByTestId("LightmodeIcon");
        expect(lightmodeIcon).toBeInTheDocument();
    });

    it("should render darkmode icon when clicked", async () => {
        const toggle = screen.queryByTestId("DarkmodeToggle");
        fireEvent.click(toggle);

        await waitFor(() => {
            const darkmodeIcon = screen.queryByTestId("DarkmodeIcon");
            expect(darkmodeIcon).toBeInTheDocument();
        });
    });
});
