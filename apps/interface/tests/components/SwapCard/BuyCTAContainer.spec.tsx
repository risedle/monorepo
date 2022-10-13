import { render, screen } from "@testing-library/react";
import * as wagmi from "wagmi";
import { utils, constants } from "ethers";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

import BuyCTAContainer from "@/components/SwapCard/BuyCTAContainer";
import * as store from "@/hooks/useBuyAmountStore";

jest.mock("@/hooks/useBuyAmountStore");

describe("<BuyCTAContainer />", () => {
    beforeEach(() => {
        const useAccount = jest.spyOn(wagmi, "useAccount");
        useAccount.mockImplementation(() => ({
            address: "addy",
        }));

        const useContractReads = jest.spyOn(wagmi, "useContractReads");
        useContractReads.mockReturnValue({
            data: null,
        });

        const usePrepareContractWrite = jest.spyOn(
            wagmi,
            "usePrepareContractWrite"
        );
        usePrepareContractWrite.mockReturnValue({
            data: null,
        });

        const useContractWrite = jest.spyOn(wagmi, "useContractWrite");
        useContractWrite.mockReturnValue({
            data: null,
        });

        const useWaitForTransaction = jest.spyOn(
            wagmi,
            "useWaitForTransaction"
        );
        useWaitForTransaction.mockReturnValue({
            data: null,
        });
    });
    describe("Given amount is invalid", () => {
        it("Should render enter amount button", () => {
            const useBuyAmountStore = jest.spyOn(store, "useBuyAmountStore");
            useBuyAmountStore.mockReturnValue("");

            render(<BuyCTAContainer />);

            const amountButton = screen.queryByTestId("CTAEnterAmountButton");
            expect(amountButton).toBeVisible();
        });
    });

    describe("Given invalid data", () => {
        it("Should render loading button", () => {
            const useBuyAmountStore = jest.spyOn(store, "useBuyAmountStore");
            useBuyAmountStore.mockReturnValue("");

            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockReturnValue({
                data: null,
            });

            render(<BuyCTAContainer />);

            const loadingButton = screen.queryByTestId("CTALoadingButton");
            expect(loadingButton).toBeVisible();
        });
    });

    describe("Given quoteAmount.gt(userBalance)", () => {
        it("Should render button with data-testid='CTANotEnoughBalanceButton'", () => {
            const dummyBigNumber = utils.parseEther("2");
            const dummySmallNumber = utils.parseEther("1");
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockReturnValue({
                data: [dummyBigNumber, dummySmallNumber, constants.MaxUint256],
            });

            render(<BuyCTAContainer />);

            const balanceButton = screen.queryByTestId(
                "CTANotEnoughBalanceButton"
            );
            expect(balanceButton).toBeInTheDocument();
        });
    });

    describe("Given waitApproval.isLoading", () => {
        it("Should render button with data-testid='CTAApprovingButton'", () => {
            const useBuyAmountStore = jest.spyOn(store, "useBuyAmountStore");
            useBuyAmountStore.mockReturnValue("");
            const useWaitForTransaction = jest.spyOn(
                wagmi,
                "useWaitForTransaction"
            );
            useWaitForTransaction.mockImplementation((props) => {
                if (props?.hash === "approve") return { isLoading: true };
                return { isLoading: false };
            });

            render(<BuyCTAContainer />);

            const approveButton = screen.queryByTestId("CTAApprovingButton");
            expect(approveButton).toBeVisible();
        });
    });

    describe("Given quoteAmount.gt(allowanceAmount)", () => {
        it("Should render button with data-testid='CTAApprovalButton'", () => {
            const useBuyAmountStore = jest.spyOn(store, "useBuyAmountStore");
            useBuyAmountStore.mockReturnValue("5");

            const dummyBigNumber = utils.parseEther("10");

            // Mock allowance value to be equal to 0
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockImplementation(() => ({
                data: [dummyBigNumber, dummyBigNumber, utils.parseEther("0")],
            }));

            render(<BuyCTAContainer />);

            const approvalButton = screen.queryByTestId("CTAApprovalButton");
            expect(approvalButton).toBeInTheDocument();
        });
    });

    describe("Given buySell.isLoading", () => {
        it("Should render button with data-testid='CTASwappingButton'", () => {
            const useBuyAmountStore = jest.spyOn(store, "useBuyAmountStore");
            useBuyAmountStore.mockReturnValue("5");

            const useWaitForTransaction = jest.spyOn(
                wagmi,
                "useWaitForTransaction"
            );
            useWaitForTransaction.mockImplementation((props) => {
                if (props?.hash === "swapExactFLTForTokens")
                    return { isLoading: true };
                return { isLoading: false };
            });

            render(<BuyCTAContainer />);

            const swappingButton = screen.queryByTestId("CTASwappingButton");
            expect(swappingButton).toBeInTheDocument();
        });
    });

    describe("Given non of the case above happen", () => {
        it("render button with data-testid='CTASwapButton'", () => {
            const useBuyAmountStore = jest.spyOn(store, "useBuyAmountStore");
            useBuyAmountStore.mockReturnValue("5");

            render(<BuyCTAContainer />);

            const swapButton = screen.queryByTestId("CTASwapButton");
            expect(swapButton).toBeInTheDocument();
        });
    });
});
