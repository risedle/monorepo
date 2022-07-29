import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import SlippageTolerance from "@/components/SwapCard/SlippageTolerance";

beforeEach(() => {
    window.scrollTo = jest.fn();
});

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<SlippageTolerance />", () => {
    it("should render slippage settings if button is clicked", async () => {
        render(<SlippageTolerance />);
        const panel = screen.queryByTestId("SwapCardSlippageTolerancePanel");
        expect(panel).not.toBeVisible();

        const button = screen.queryByTestId("SwapCardSlippageToleranceToggle");
        fireEvent.click(button);

        await waitFor(() => {
            const panel = screen.queryByTestId(
                "SwapCardSlippageTolerancePanel"
            );
            expect(panel).toBeVisible();
        });
    });
});
