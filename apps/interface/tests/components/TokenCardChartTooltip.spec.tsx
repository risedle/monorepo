import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import { TokenCardChartTooltip } from "../../components/TokenCard/chart";

describe("<TokenCardChartTooltip />", () => {
    it("should render price and timestamp", () => {
        render(
            <TokenCardChartTooltip
                payload={[{ payload: { timestamp: 1658471219, price: 5.6 } }]}
            />
        );
        const tooltip = screen.queryByTestId("TokenCardChartTooltip");
        expect(tooltip).toBeInTheDocument();

        const price = screen.queryByTestId("TokenCardChartTooltipPrice");
        expect(price).toHaveTextContent("$5.60");

        const ts = screen.queryByTestId("TokenCardChartTooltipTimestamp");
        expect(ts).toHaveTextContent("Jul 22, 2022, 1:26 PM");
    });

    describe("Given undefined payload", () => {
        it("should not render price and timestamp", () => {
            render(<TokenCardChartTooltip />);
            const tooltip = screen.queryByTestId("TokenCardChartTooltip");
            expect(tooltip).not.toBeInTheDocument();

            const price = screen.queryByTestId("TokenCardChartTooltipPrice");
            expect(price).not.toBeInTheDocument();

            const ts = screen.queryByTestId("TokenCardChartTooltipTimestamp");
            expect(ts).not.toBeInTheDocument();
        });
    });
});
