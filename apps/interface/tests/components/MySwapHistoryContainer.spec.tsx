import { render, screen } from "@testing-library/react";
import * as wagmi from "wagmi";
import * as SWR from "swr";

import MySwapHistoryContainer from "@/components/SwapHistoryCard/MySwapContainer";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<MySwapHistoryContainer />", () => {
    describe("Given valid data", () => {
        it("should render data", async () => {
            const useAccount = jest.spyOn(wagmi, "useAccount");
            useAccount.mockImplementation(() => ({
                address: "addy",
            }));
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValue({
                isLoaded: true,
                data: {
                    user: [
                        {
                            timestamp: 1657868400,
                            hash: "0x5b0824785cc2370f5d903532eb6b26f4154e90e2faa5864c9dac9ebb9a25d3df",
                            user: "0x1418be4753a22b69b613fa8b8144d856c023d46b",
                            tokenIn: {
                                name: "2X Long ETH Risedle",
                                symbol: "ETHRISE",
                            },
                            amountIn: 0.6,
                            amountInUSD: 12.9879,
                            tokenOut: {
                                name: "2X Long ETH Risedle",
                                symbol: "ETHRISE",
                            },
                            amountOut: 0.6,
                            amountOutUSD: 12.9879,
                        },
                    ],
                },
            });

            render(<MySwapHistoryContainer symbol="test" />);
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
            const warning = screen.queryByTestId("warningErrorBox");
            expect(warning).toBeInTheDocument();
            expect(
                screen.getByText(/wallet not connected/i)
            ).toBeInTheDocument();
        });
    });

    describe("Given null swaps data with address", () => {
        it("should render warning no data", () => {
            const useAccount = jest.spyOn(wagmi, "useAccount");
            useAccount.mockImplementation(() => ({
                address: "address",
            }));
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValue({
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
                    user: [],
                },
                isLoaded: true,
            });
            render(<MySwapHistoryContainer symbol="test" />);
            const warning = screen.queryByTestId("warningErrorBox");
            expect(warning).toBeInTheDocument();
            expect(screen.getByText(/No Swap History/i)).toBeInTheDocument();
        });
    });
});
