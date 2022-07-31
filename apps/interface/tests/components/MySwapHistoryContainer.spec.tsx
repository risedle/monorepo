import { render, screen } from "@testing-library/react";
import * as wagmi from "wagmi";

// import QuoteBalanceContainer from "@/components/SwapCard/QuoteBalanceContainer";
import MySwapHistoryContainer from "@/components/SwapHistoryCard/MySwapContainer";
import renderApp from "../utils/renderApp";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<QuoteBalanceContainer />", () => {
    beforeEach(() => {
        const useAccount = jest.spyOn(wagmi, "useAccount");
        useAccount.mockImplementation(() => ({
            address: "addy",
        }));
    });
    describe("Given failed contract call", () => {
        it("should render data", () => {
            render(<MySwapHistoryContainer symbol="test" />);
            const tableData = screen.queryByTestId("SwapHistoryCardTable");
            expect(tableData).toBeInTheDocument();
        });
    });
});
