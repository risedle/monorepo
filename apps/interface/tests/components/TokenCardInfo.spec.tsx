import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import "../utils/window.ResizeObserver.mock.ts";
import { TokenCardInfo } from "../../components/TokenCard/info";

describe("<TokenCardInfo />", () => {
    describe("Given positive price change", () => {
        it("should render up icon", () => {
            render(
                <TokenCardInfo
                    price={10}
                    priceChangePercent={10}
                    marketCap={20}
                />
            );
            const up = screen.queryByTestId("PriceUpIcon");
            expect(up).toBeInTheDocument();
            const down = screen.queryByTestId("PriceDownIcon");
            expect(down).not.toBeInTheDocument();
        });
    });

    describe("Given negative price change", () => {
        it("should render up icon", () => {
            render(
                <TokenCardInfo
                    price={10}
                    priceChangePercent={-10}
                    marketCap={20}
                />
            );
            const up = screen.queryByTestId("PriceUpIcon");
            expect(up).not.toBeInTheDocument();
            const down = screen.queryByTestId("PriceDownIcon");
            expect(down).toBeInTheDocument();
        });
    });
});
