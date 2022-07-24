import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import { PriceChartLineTooltip } from "../../components/PriceChart/Tooltip";

describe("<PriceChartLineTooltip />", () => {
    it("should render price and timestamp", () => {
        render(
            <PriceChartLineTooltip
                payload={[{ payload: { timestamp: 1658471219, price: 5.6 } }]}
            />
        );
        const tooltip = screen.queryByTestId("PriceChartLineTooltip");
        expect(tooltip).toBeInTheDocument();

        const price = screen.queryByTestId("PriceChartLineTooltipPrice");
        expect(price).toHaveTextContent("$5.60");

        const ts = screen.queryByTestId("PriceChartLineTooltipTimestamp");
        expect(ts).toHaveTextContent("Jul 22, 2022");
    });

    describe("Given undefined payload", () => {
        it("should not render price and timestamp", () => {
            render(<PriceChartLineTooltip />);
            const tooltip = screen.queryByTestId("PriceChartLineTooltip");
            expect(tooltip).not.toBeInTheDocument();

            const price = screen.queryByTestId("PriceChartLineTooltipPrice");
            expect(price).not.toBeInTheDocument();

            const ts = screen.queryByTestId("PriceChartLineTooltipTimestamp");
            expect(ts).not.toBeInTheDocument();
        });
    });
});
