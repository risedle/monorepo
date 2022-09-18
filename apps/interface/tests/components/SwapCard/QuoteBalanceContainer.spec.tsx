import { render, screen } from "@testing-library/react";
import * as wagmi from "wagmi";
import { utils } from "ethers";

import getBaseConfig from "@/utils/getBaseConfig";

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

    describe("Given wallet is not connected", () => {
        it("Should render 0 quote", () => {
            const { defaultQuoteChainlinkDecimals } = getBaseConfig();
            const latestPrice = utils.parseUnits(
                "10",
                defaultQuoteChainlinkDecimals
            );
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockReturnValue({
                data: [null, latestPrice],
            });

            render(<QuoteBalanceContainer />);

            const balance = screen.queryByTestId("BalanceAmount");
            expect(balance).toHaveTextContent("0");
        });
    });

    describe("Given wallet is connected", () => {
        it("Should render correct quote", () => {
            const { defaultQuoteDecimals, defaultQuoteChainlinkDecimals } =
                getBaseConfig();
            const balance = utils.parseUnits("10", defaultQuoteDecimals);
            const latestPrice = utils.parseUnits(
                "10",
                defaultQuoteChainlinkDecimals
            );
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockReturnValue({
                data: [balance, latestPrice],
            });

            render(<QuoteBalanceContainer />);

            const balanceAmount = screen.queryByTestId("BalanceAmount");
            expect(balanceAmount).toHaveTextContent("100");
        });
    });

    describe("Given invalid data", () => {
        it("Should render 0 quote", () => {
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockReturnValue({
                data: null,
            });

            render(<QuoteBalanceContainer />);

            const balance = screen.queryByTestId("BalanceAmount");
            expect(balance).toHaveTextContent("0");
        });
    });
});
