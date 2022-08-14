import { render, screen } from "@testing-library/react";

import SwapHistoryCardTable from "@/components/SwapHistoryCard/Table";

describe("<SwapHistoryCardTable />", () => {
    // TODO(pyk): test given is loaded true and false
    it("should render all swaps", () => {
        const swaps = [
            {
                timestamp: "1",
                transaction: { id: "1" },
                amountInUSD: "1",
                tokenIn: { symbol: "BUSD" },
                tokenOut: { symbol: "BNBDROP" },
            },
            {
                timestamp: "2",
                transaction: { id: "2" },
                amountInUSD: "1",
                tokenIn: { symbol: "BNBDROP" },
                tokenOut: { symbol: "BUSD" },
            },
        ];
        render(
            <SwapHistoryCardTable
                swaps={swaps}
                isLoaded={true}
                symbol="BNBDROP"
            />
        );
        const txs = screen.queryAllByTestId(
            "SwapHistoryCardTableTransactionLink"
        );
        expect(txs.length).toBe(2);
        const times = screen.queryAllByTestId("SwapHistoryCardTableTime");
        expect(times.length).toBe(2);
        const values = screen.queryAllByTestId(
            "SwapHistoryCardTableTotalValue"
        );
        expect(values.length).toBe(2);
        expect(screen.getByText(/Buy BNBDROP/i)).toBeInTheDocument();
        expect(screen.getByText(/Sell BNBDROP/i)).toBeInTheDocument();
    });
});
