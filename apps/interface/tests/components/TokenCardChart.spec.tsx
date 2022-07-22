import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import "../utils/window.ResizeObserver.mock";
import "../utils/recharts.mock";
import { TokenCardChart } from "../../components/TokenCard/chart";

describe("<TokenCardChart />", () => {
    describe("Given uptrend price chart", () => {
        it("should render green chart", () => {
            const { debug, container } = render(
                <TokenCardChart
                    prices={[
                        { timestamp: 1658471219, price: 2 },
                        { timestamp: 1658471219, price: 5.6 },
                    ]}
                />
            );
            const path = container.querySelector("path");
            expect(path).toBeInTheDocument();
            expect(path).toHaveAttribute("fill", "url(#upGradient)");
        });
    });

    describe("Given downtrend price chart", () => {
        it("should render green chart", () => {
            const { debug, container } = render(
                <TokenCardChart
                    prices={[
                        { timestamp: 1658471219, price: 2 },
                        { timestamp: 1658471219, price: 1 },
                    ]}
                />
            );
            const path = container.querySelector("path");
            expect(path).toBeInTheDocument();
            expect(path).toHaveAttribute("fill", "url(#downGradient)");
        });
    });

    describe("Given empty prices", () => {
        it("should render placeholder component", () => {
            render(<TokenCardChart prices={[]} />);
            const el = screen.queryByTestId("TokenCardChartUndefined");
            expect(el).toBeInTheDocument();
        });
    });
});
