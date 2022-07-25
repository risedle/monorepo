import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import "../utils/window.ResizeObserver.mock.ts";
import TradeInfoCardUserPosition from "../../components/TradeInfoCard/UserPosition";

describe("<TradeInfoCardUserPosition />", () => {
    describe("Given initial state", () => {
        it("should render up icon", () => {
            render(
                <TradeInfoCardUserPosition
                    balance={0}
                    valueUSD={0}
                    pnlPercent={0}
                    pnlUSD={0}
                />
            );
            const up = screen.queryAllByTestId("ArrowUpIcon");
            expect(up.length).toBe(2);
            const down = screen.queryByTestId("ArrowDownIcon");
            expect(down).not.toBeInTheDocument();
        });
    });

    describe("Given a profit", () => {
        it("should render up icon", () => {
            render(
                <TradeInfoCardUserPosition
                    balance={10}
                    valueUSD={10}
                    pnlPercent={20}
                    pnlUSD={20}
                />
            );
            const up = screen.queryAllByTestId("ArrowUpIcon");
            expect(up.length).toBe(2);
            const down = screen.queryByTestId("ArrowDownIcon");
            expect(down).not.toBeInTheDocument();
        });
    });

    describe("Given a loss", () => {
        it("should render down icon", () => {
            render(
                <TradeInfoCardUserPosition
                    balance={10}
                    valueUSD={10}
                    pnlPercent={-20}
                    pnlUSD={-20}
                />
            );
            const up = screen.queryByTestId("ArrowUpIcon");
            expect(up).not.toBeInTheDocument();
            const down = screen.queryAllByTestId("ArrowDownIcon");
            expect(down.length).toBe(2);
        });
    });
});
