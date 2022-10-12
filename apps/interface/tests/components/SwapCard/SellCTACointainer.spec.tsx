import { render, screen, waitFor } from "@testing-library/react";
import * as wagmi from "wagmi";
import { utils, constants } from "ethers";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

import SellCTAContainer from "@/components/SwapCard/SellCTAContainer";
import * as store from "@/hooks/useSellAmountStore";

jest.mock("@/hooks/useSellAmountStore");

describe("<SellCTAContainer />", () => {
    beforeEach(() => {
        // Account is connected by default
        const useAccount = jest.spyOn(wagmi, "useAccount");
        useAccount.mockImplementation(() => ({
            address: "0xSomething",
        }));

        // Mock amount to be equal to "" by default
        const useSellAmountStore = jest.spyOn(store, "useSellAmountStore");
        useSellAmountStore.mockReturnValue("");

        // Create dummy BigNumber values using parse ether because our ERC20 also use 18 decimals
        const dummyBigNumber = utils.parseEther("10");

        // Mock useContractReads to return dummy values by default
        const useContractReads = jest.spyOn(wagmi, "useContractReads");
        useContractReads.mockImplementation(() => ({
            data: [dummyBigNumber, dummyBigNumber, constants.MaxUint256],
        }));

        // Contract write hooks will return nothing by default
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

        // Wait for transaction hook will return isLoading = false by default
        const useWaitForTransaction = jest.spyOn(
            wagmi,
            "useWaitForTransaction"
        );
        useWaitForTransaction.mockReturnValue({ isLoading: false });
    });

    describe("Given address == null", () => {
        it("Should render button with data=testid='CTAWalletButton'", () => {
            // Mock connected user address
            const useAccount = jest.spyOn(wagmi, "useAccount");
            useAccount.mockImplementation(() => ({
                address: null,
            }));

            render(<SellCTAContainer />);

            const connectWalletButton =
                screen.queryByTestId("CTAWalletButton");
            expect(connectWalletButton).toBeInTheDocument();
        });
    });

    describe("Given amount == ''", () => {
        it("Should render button with data-testid='CTAEnterAmountButton'", () => {
            // Amount is empty string by default, so immediately render the component
            render(<SellCTAContainer />);

            const enterAmountButton = screen.queryByTestId(
                "CTAEnterAmountButton"
            );
            expect(enterAmountButton).toBeInTheDocument();
        });
    });

    describe("Given data == null || (data && data[0] == null)", () => {
        it("Should render button with data-testid='CTALoadingButton'", () => {
            // Mock amount to be not equal to an empty string
            const useSellAmountStore = jest.spyOn(store, "useSellAmountStore");
            useSellAmountStore.mockReturnValue("1");

            // Mock data to be null
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockImplementation(() => ({
                data: null,
            }));

            render(<SellCTAContainer />);

            const loadingButton = screen.queryByTestId("CTALoadingButton");
            expect(loadingButton).toBeInTheDocument();
        });
    });

    describe("Given amountIn.gt(userBalance)", () => {
        it("Should render button with data-testid='CTANotEnoughBalanceButton'", () => {
            // Mock amount to be not greater that user's flt token balance
            const useSellAmountStore = jest.spyOn(store, "useSellAmountStore");
            useSellAmountStore.mockReturnValue("100");

            render(<SellCTAContainer />);

            const notEnoughBalanceButton = screen.queryByTestId(
                "CTANotEnoughBalanceButton"
            );
            expect(notEnoughBalanceButton).toBeInTheDocument();
        });
    });

    describe("Given waitApproval.isLoading", () => {
        it("Should render button with data-testid='CTAApprovingButton'", () => {
            const useSellAmountStore = jest.spyOn(store, "useSellAmountStore");
            useSellAmountStore.mockReturnValue("5");

            const useWaitForTransaction = jest.spyOn(
                wagmi,
                "useWaitForTransaction"
            );
            useWaitForTransaction.mockImplementation((props) => {
                if (props?.hash === "approve") return { isLoading: true };
                return { isLoading: false };
            });

            render(<SellCTAContainer />);

            const approvingButton = screen.queryByTestId("CTAApprovingButton");
            expect(approvingButton).toBeInTheDocument();
        });
    });

    describe("Given amountIn.gte(allowanceAmount)", () => {
        it("Should render button with data-testid='CTAApprovalButton'", () => {
            const useSellAmountStore = jest.spyOn(store, "useSellAmountStore");
            useSellAmountStore.mockReturnValue("5");

            const dummyBigNumber = utils.parseEther("10");

            // Mock allowance value to be equal to 0
            const useContractReads = jest.spyOn(wagmi, "useContractReads");
            useContractReads.mockImplementation(() => ({
                data: [dummyBigNumber, dummyBigNumber, utils.parseEther("0")],
            }));

            render(<SellCTAContainer />);

            const approvalButton = screen.queryByTestId("CTAApprovalButton");
            expect(approvalButton).toBeInTheDocument();
        });
    });

    describe("Given waitSell.isLoading", () => {
        it("Should render button with data-testid='CTASwappingButton'", () => {
            const useSellAmountStore = jest.spyOn(store, "useSellAmountStore");
            useSellAmountStore.mockReturnValue("5");

            const useWaitForTransaction = jest.spyOn(
                wagmi,
                "useWaitForTransaction"
            );
            useWaitForTransaction.mockImplementation((props) => {
                if (props?.hash === "swapExactFLTForTokens")
                    return { isLoading: true };
                return { isLoading: false };
            });

            render(<SellCTAContainer />);

            const swappingButton = screen.queryByTestId("CTASwappingButton");
            expect(swappingButton).toBeInTheDocument();
        });
    });

    describe("Given non of the case above happen", () => {
        it("render button with data-testid='CTASwapButton'", () => {
            const useSellAmountStore = jest.spyOn(store, "useSellAmountStore");
            useSellAmountStore.mockReturnValue("5");

            render(<SellCTAContainer />);

            const swapButton = screen.queryByTestId("CTASwapButton");
            expect(swapButton).toBeInTheDocument();
        });
    });
});
