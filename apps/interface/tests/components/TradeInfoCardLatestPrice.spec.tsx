import { render, screen } from "@testing-library/react";

import TradeInfoCardLatestPrice from "@/components/TradeInfoCard/LatestPrice";

describe("<TradeInfoCardLatestPrice />", () => {
    describe("Given positive price change", () => {
        it("should render up icon", () => {
            render(
                <TradeInfoCardLatestPrice
                    price={10}
                    priceChangePercent={10}
                    priceChangeUSD={20}
                />
            );
            const up = screen.queryByTestId("ArrowUpIcon");
            expect(up).toBeInTheDocument();
            const down = screen.queryByTestId("ArrowDownIcon");
            expect(down).not.toBeInTheDocument();
        });
    });

    describe("Given negative price change", () => {
        it("should render down icon", () => {
            render(
                <TradeInfoCardLatestPrice
                    price={10}
                    priceChangePercent={-10}
                    priceChangeUSD={20}
                />
            );
            const up = screen.queryByTestId("ArrowUpIcon");
            expect(up).not.toBeInTheDocument();
            const down = screen.queryByTestId("ArrowDownIcon");
            expect(down).toBeInTheDocument();
        });
    });
});
