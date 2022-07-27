import { render, screen } from "@testing-library/react";

import BackingCardAllocationTable from "@/components/BackingCard/AllocationTable";

describe("<BackingCardAllocationTable />", () => {
    describe("Given zero change", () => {
        it("should render up icon", () => {
            render(
                <BackingCardAllocationTable
                    collateralChangePercent={0}
                    debtChangePercent={0}
                />
            );
            const up = screen.queryAllByTestId("ArrowUpIcon");
            expect(up.length).toBe(2);
            const down = screen.queryAllByTestId("ArrowDownIcon");
            expect(down.length).toBe(0);
        });
    });

    describe("Given positive collateral and debt change", () => {
        it("should render up icon", () => {
            render(
                <BackingCardAllocationTable
                    collateralChangePercent={10}
                    debtChangePercent={20}
                />
            );
            const up = screen.queryAllByTestId("ArrowUpIcon");
            expect(up.length).toBe(2);
            const down = screen.queryAllByTestId("ArrowDownIcon");
            expect(down.length).toBe(0);
        });
    });

    describe("Given negative collateral and debt change", () => {
        it("should render down icon", () => {
            render(
                <BackingCardAllocationTable
                    collateralChangePercent={-10}
                    debtChangePercent={-20}
                />
            );
            const up = screen.queryAllByTestId("ArrowUpIcon");
            expect(up.length).toBe(0);
            const down = screen.queryAllByTestId("ArrowDownIcon");
            expect(down.length).toBe(2);
        });
    });
});
