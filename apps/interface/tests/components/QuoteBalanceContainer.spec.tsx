import { render, screen } from "@testing-library/react";
import * as wagmi from "wagmi";
import { ethers } from "ethers";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

import QuoteBalanceContainer from "@/components/SwapCard/QuoteBalanceContainer";

describe("<QuoteBalanceContainer />", () => {
    beforeEach(() => {
        const useAccount = jest.spyOn(wagmi, "useAccount");
        useAccount.mockImplementation(() => ({
            address: "addy",
        }));
    });
    describe("Given failed contract call", () => {
        it("Should render 0 quote", () => {
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockImplementation(() => ({
                data: [null],
            }));

            render(<QuoteBalanceContainer />);

            const balance = screen.queryByTestId("BalanceAmount");
            expect(balance).toHaveTextContent("0");
        });
    });

    describe("Given succesfull contract call", () => {
        it("Should render correct quote", () => {
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockImplementation(() => ({
                data: [
                    ethers.BigNumber.from("2000000000000000000"),
                    ethers.BigNumber.from("500000000"),
                ],
            }));

            render(<QuoteBalanceContainer />);

            const balance = screen.queryByTestId("BalanceAmount");
            expect(balance).toHaveTextContent("2");
        });
    });
});
