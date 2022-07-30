import { render, screen } from "@testing-library/react";
import * as wagmi from "wagmi";
import { ethers } from "ethers";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

import BuyQuoteContainer from "@/components/SwapCard/BuyQuoteContainer";

describe("<BuyQuoteContainer />", () => {
    describe("Given failed contract call", () => {
        it("Should render 0 quote", () => {
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockImplementation(() => ({
                data: [null],
            }));

            render(<BuyQuoteContainer />);

            const quote = screen.queryByTestId("QuoteAmount");
            expect(quote).toHaveTextContent("0");
            const quoteUSD = screen.queryByTestId("QuoteAmountUSD");
            expect(quoteUSD).toHaveTextContent("0");
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

            render(<BuyQuoteContainer />);

            const quote = screen.queryByTestId("QuoteAmount");
            expect(quote).toHaveTextContent("2");
            const quoteUSD = screen.queryByTestId("QuoteAmountUSD");
            expect(quoteUSD).toHaveTextContent("10");
        });
    });
});
