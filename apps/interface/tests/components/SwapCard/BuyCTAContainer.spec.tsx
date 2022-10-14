import { render, screen } from "@testing-library/react";
import * as wagmi from "wagmi";
import { utils } from "ethers";

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

        const useBuyAmountStore = jest.spyOn(store, "useBuyAmountStore");
        useBuyAmountStore.mockReturnValue("5");

        const dummySmallNumber = utils.parseEther("1");
        const dummyBigNumber = utils.parseEther("10");
        const dummyBiggerNumber = utils.parseEther("20");
        const useContractReads = jest.spyOn(wagmi, "useContractReads");
        useContractReads.mockReturnValue({
            data: [
                dummySmallNumber,
                dummyBigNumber,
                dummyBigNumber,
                dummyBiggerNumber,
                {
                    1: dummyBigNumber,
                    2: dummyBigNumber,
                    _da: dummyBigNumber,
                    _ca: dummyBigNumber,
                },
                dummyBigNumber,
                dummyBigNumber,
            ],
        });

        const usePrepareContractWrite = jest.spyOn(
            wagmi,
            "usePrepareContractWrite"
        );
        usePrepareContractWrite.mockImplementation((props) => ({
            config: {
                functionName: props.functionName,
            },
        }));

        const useContractWrite = jest.spyOn(wagmi, "useContractWrite");
        useContractWrite.mockImplementation((props) => ({
            data: {
                hash: props.functionName,
            },
        }));

        const useWaitForTransaction = jest.spyOn(
            wagmi,
            "useWaitForTransaction"
        );
        useWaitForTransaction.mockReturnValue({ isLoading: false });
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
                data: [dummyBigNumber, dummySmallNumber],
            });

            render(<BuyCTAContainer />);

            const balanceButton = screen.queryByTestId(
                "CTANotEnoughBalanceButton"
            );
            expect(balanceButton).toBeVisible();
        });
    });

    describe("Given waitApproval.isLoading", () => {
        it("Should render button with data-testid='CTAApprovingButton'", () => {
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
            const dummySmallNumber = utils.parseEther("1");
            const dummyBigNumber = utils.parseEther("10");
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockReturnValue({
                data: [
                    dummySmallNumber,
                    dummyBigNumber,
                    dummySmallNumber,
                    dummyBigNumber,
                    {
                        1: dummyBigNumber,
                        2: dummyBigNumber,
                        _da: dummyBigNumber,
                        _ca: dummyBigNumber,
                    },
                    dummyBigNumber,
                    utils.parseEther("0"),
                ],
            });

            render(<BuyCTAContainer />);

            const approvalButton = screen.queryByTestId("CTAApprovalButton");
            expect(approvalButton).toBeInTheDocument();
        });
    });

    describe("Given waitBuy.isLoading", () => {
        it("Should render button with data-testid='CTASwappingButton'", () => {
            const useWaitForTransaction = jest.spyOn(
                wagmi,
                "useWaitForTransaction"
            );
            useWaitForTransaction.mockImplementation((props) => {
                if (props?.hash === "swapTokensForExactFLT")
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
            useBuyAmountStore.mockReturnValue("1");

            render(<BuyCTAContainer />);

            const swapButton = screen.queryByTestId("CTASwapButton");
            expect(swapButton).toBeInTheDocument();
        });
    });
});
