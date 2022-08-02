import { render, screen } from "@testing-library/react";
import * as wagmi from "wagmi";
import * as SWR from "swr";

import MySwapHistoryContainer from "@/components/SwapHistoryCard/MySwapContainer";
import renderApp from "../utils/renderApp";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<MySwapHistoryContainer />", () => {
    describe("Given valid data", () => {
        it("should render data", () => {
            const useAccount = jest.spyOn(wagmi, "useAccount");
            useAccount.mockImplementation(() => ({
                address: "addy",
            }));
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValueOnce({
                data: {
                    user: [
                        {
                            timestamp: "1",
                            transaction: { id: "1" },
                            amountInUSD: "1",
                            tokenIn: { symbol: "A" },
                            tokenOut: { symbol: "B" },
                        },
                    ],
                },
            });

            renderApp(<MySwapHistoryContainer symbol="test" />);
            const tableData = screen.queryByTestId("SwapHistoryCardTable");
            expect(tableData).toBeInTheDocument();
        });
    });

    describe("Given null address", () => {
        it("should render warning ", () => {
            const useAccount = jest.spyOn(wagmi, "useAccount");
            useAccount.mockImplementation(() => ({
                address: null,
            }));

            render(<MySwapHistoryContainer symbol="test" />);
            const warning = screen.queryByTestId("walletNotConnectedWarning");
            expect(warning).toBeInTheDocument();
        });
    });

    describe("Given null swaps data with address", () => {
        it("should render warning no data", () => {
            const useAccount = jest.spyOn(wagmi, "useAccount");
            useAccount.mockImplementation(() => ({
                address: "address",
            }));
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValueOnce({
                data: {
                    flt: [
                        {
                            timestamp: "1",
                            transaction: { id: "1" },
                            amountInUSD: "1",
                            tokenIn: { symbol: "A" },
                            tokenOut: { symbol: "B" },
                        },
                    ],
                    user: null,
                },
                isLoaded: true,
            });
            render(<MySwapHistoryContainer symbol="test" />);
            const tableData = screen.queryByTestId("noSwapHistoryWarning");
            expect(tableData).toBeInTheDocument();
        });
    });
});
