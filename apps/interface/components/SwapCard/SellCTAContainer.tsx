import {
    VStack,
    Button,
    useColorModeValue,
    Spinner,
    Text,
    useToast,
    Box,
    HStack,
    Link,
} from "@chakra-ui/react";
import {
    useAccount,
    useContractReads,
    erc20ABI,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { ethers, utils } from "ethers";

// Utils
import getBaseConfig from "@/utils/getBaseConfig";
import getFuseDebtAddress from "@/utils/getFuseDebtAddress";
import getTransactionExplorerURL from "@/utils/getTransactionExplorerURL";

// ABI
import RouterABI from "@/abis/RouterABI";
import ChainlinkABI from "@/abis/ChainlinkABI";
import FuseLeveragedTokenABI from "@/abis/FuseLeveragedTokenABI";

// Hooks
import useSellAmountStore from "@/hooks/useSellAmountStore";
import useSlippageToleranceStore from "@/hooks/useSlippageToleranceStore";

// Toasts
import ErrorToast from "@/components/Toasts/Error";

// Icons
import ArrowTopRightIcon from "@/components/Icons/ArrowTopRight";

enum CTAState {
    ShowConnectWalletButton,
    ShowEnterAmountButton,
    ShowLoadingButton,
    ShowNotEnoughBalanceButton,
    ShowApprovalButton,
    ShowApprovingButton,
    ShowSwapButton,
    ShowSwappingButton,
}

// Props
interface SwapCardSellCTAContainerProps {
    fltAddress: string;
}

export const SwapCardSellCTAContainer = (
    props: SwapCardSellCTAContainerProps
) => {
    // Data
    const { fltAddress } = props;
    const {
        chainSlug,
        defaultQuoteAddress,
        routerAddress,
        defaultQuoteChainlinkAddress,
    } = getBaseConfig();

    // States
    const [ctaState, setCTAState] = useState(CTAState.ShowConnectWalletButton);

    // Hooks
    const { address } = useAccount();
    const { openConnectModal } = useConnectModal();
    const amount = useSellAmountStore((state) => state.amount);
    const slippage = useSlippageToleranceStore((state) => state.slippage);

    // NOTE: we set the sell amount smallest value as possible to prevent
    // getAmountOut contract call to revert
    const sellAmount =
        amount == "" ? "0.000000000000000001" : `${parseFloat(amount)}`;
    const amountIn = utils.parseUnits(sellAmount, "ether");

    // TODO(pyk): add toast when error
    const { data } = useContractReads({
        contracts: [
            {
                addressOrName: routerAddress,
                contractInterface: RouterABI,
                functionName: "getAmountOut",
                args: [fltAddress, defaultQuoteAddress, amountIn],
            },
            {
                addressOrName: fltAddress,
                contractInterface: erc20ABI,
                functionName: "balanceOf",
                args: address,
            },
            {
                addressOrName: fltAddress,
                contractInterface: erc20ABI,
                functionName: "allowance",
                args: [address, routerAddress],
            },
        ],
        watch: true,
    });

    // Contract writes
    const prepareApproval = usePrepareContractWrite({
        addressOrName: fltAddress,
        contractInterface: erc20ABI,
        functionName: "approve",
        args: [routerAddress, ethers.constants.MaxUint256],
    });
    const sendApproval = useContractWrite(prepareApproval.config);
    const waitApproval = useWaitForTransaction({
        hash: sendApproval.data?.hash,
        confirmations: 3,
    });

    // Get min amount out
    const quoteAmount =
        data && data[0] != null ? data[0] : ethers.BigNumber.from("0");
    const normalizedSlippage = `${parseFloat(slippage) / 100}`;
    const slippageInEther = ethers.utils.parseUnits(
        normalizedSlippage,
        "ether"
    );
    const oneEther = ethers.utils.parseUnits("1", "ether");
    const slippageTolerance = quoteAmount.mul(slippageInEther).div(oneEther);
    const minAmountOut = quoteAmount.sub(slippageTolerance);

    const prepareSell = usePrepareContractWrite({
        addressOrName: routerAddress,
        contractInterface: RouterABI,
        functionName: "swapExactFLTForTokens",
        args: [fltAddress, amountIn, defaultQuoteAddress, minAmountOut],
    });
    const sendSell = useContractWrite(prepareSell.config);
    const waitSell = useWaitForTransaction({
        hash: sendSell.data?.hash,
        confirmations: 3,
    });

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const green2 = useColorModeValue("green.light.2", "green.dark.2");
    const green12 = useColorModeValue("green.light.12", "green.dark.12");

    // NOTE: we use useEffect here to prevent React Hydration Error
    // read more: https://nextjs.org/docs/messages/react-hydration-error
    useEffect(() => {
        console.log("SwapCardSellCTAContainer: ============================");
        console.log("SwapCardSellCTAContainer: data", data);

        if (address == null) {
            setCTAState(CTAState.ShowConnectWalletButton);
            return;
        }

        if (amount == "") {
            setCTAState(CTAState.ShowEnterAmountButton);
            return;
        }

        if (data == null || (data && data[0] == null)) {
            setCTAState(CTAState.ShowLoadingButton);
            return;
        }

        const userBalance = data[1];
        if (amountIn.gt(userBalance)) {
            setCTAState(CTAState.ShowNotEnoughBalanceButton);
            return;
        }

        // Approval progress and cta
        if (waitApproval.isLoading) {
            setCTAState(CTAState.ShowApprovingButton);
            return;
        }

        const allowanceAmount = data[2];
        if (amountIn.gte(allowanceAmount)) {
            setCTAState(CTAState.ShowApprovalButton);
            return;
        }

        if (waitSell.isLoading) {
            setCTAState(CTAState.ShowSwappingButton);
            return;
        }

        // Otherwise show swap button
        setCTAState(CTAState.ShowSwapButton);
    });

    return (
        <VStack
            data-testid="SwapCardSellCTAContainer"
            margin="0 !important"
            paddingX="2"
            paddingTop="4"
            paddingBottom="2"
            background={gray2}
            width="100%"
            borderBottomLeftRadius="2xl"
            borderBottomRightRadius="2xl"
        >
            {ctaState == CTAState.ShowConnectWalletButton && (
                <Button
                    data-testid="CTAWalletButton"
                    width="100%"
                    variant={chainSlug}
                    onClick={openConnectModal}
                >
                    Connect Wallet
                </Button>
            )}

            {ctaState == CTAState.ShowEnterAmountButton && (
                <Button
                    data-testid="CTAEnterAmountButton"
                    width="100%"
                    disabled
                >
                    Enter Amount
                </Button>
            )}

            {ctaState == CTAState.ShowLoadingButton && (
                <Button
                    data-testid="CTALoadingButton"
                    width="100%"
                    cursor="progress"
                    boxShadow="0px 0px 45px rgba(54, 158, 255, 0.1)"
                >
                    <Spinner
                        size="xs"
                        marginRight="2"
                        speed="0.7s"
                        color={gray12}
                        emptyColor={gray10}
                    />
                    <Text color={gray12}>Loading</Text>
                </Button>
            )}
            {ctaState == CTAState.ShowNotEnoughBalanceButton && (
                <Button
                    data-testid="CTANotEnoughBalanceButton"
                    width="100%"
                    disabled
                >
                    Not Enough Balance
                </Button>
            )}

            {/* Approval */}
            {ctaState == CTAState.ShowApprovingButton && (
                <Button
                    data-testid="CTAApprovingButton"
                    width="100%"
                    cursor="progress"
                    boxShadow="0px 0px 45px rgba(54, 158, 255, 0.1)"
                >
                    <Spinner
                        size="xs"
                        marginRight="2"
                        speed="0.7s"
                        color={gray12}
                        emptyColor={gray10}
                    />
                    <Text color={gray12}>Approving</Text>
                </Button>
            )}
            {ctaState == CTAState.ShowApprovalButton && (
                <Button
                    data-testid="CTAApprovalButton"
                    width="100%"
                    variant="green"
                    disabled={!sendApproval.write}
                    onClick={() => {
                        sendApproval.write?.();
                    }}
                >
                    Approve
                </Button>
            )}

            {/* Swap */}
            {ctaState == CTAState.ShowSwappingButton && (
                <Button
                    data-testid="CTASwappingButton"
                    width="100%"
                    cursor="progress"
                    boxShadow="0px 0px 45px rgba(54, 158, 255, 0.1)"
                >
                    <Spinner
                        size="xs"
                        marginRight="2"
                        speed="0.7s"
                        color={gray12}
                        emptyColor={gray10}
                    />
                    <Text color={gray12}>Swapping</Text>
                </Button>
            )}
            {ctaState == CTAState.ShowSwapButton && (
                <Button
                    data-testid="CTASwapButton"
                    width="100%"
                    variant={chainSlug}
                    disabled={!sendSell.write}
                    onClick={() => {
                        sendSell.write?.();
                    }}
                >
                    Swap
                </Button>
            )}

            {/* Transaction receipt */}
            {waitApproval.isLoading && (
                <Link
                    href={getTransactionExplorerURL(
                        sendApproval.data?.hash || ""
                    )}
                    target="_blank"
                    color={gray10}
                    _hover={{ textDecoration: "none", color: gray12 }}
                >
                    <HStack paddingY="2" gap={1}>
                        <Text
                            fontSize="sm"
                            lineHeight="4"
                            margin="0 !important"
                            data-testid="SwapCardTransactionReceipt"
                        >
                            Transaction receipt
                        </Text>
                        <ArrowTopRightIcon
                            w="14px"
                            h="14px"
                            margin="0 !important"
                            color={gray10}
                        />
                    </HStack>
                </Link>
            )}
            {waitSell.isLoading && (
                <Link
                    href={getTransactionExplorerURL(sendSell.data?.hash || "")}
                    target="_blank"
                    color={gray10}
                    _hover={{ textDecoration: "none", color: gray12 }}
                >
                    <HStack paddingY="2" gap={1}>
                        <Text
                            fontSize="sm"
                            lineHeight="4"
                            margin="0 !important"
                            data-testid="SwapCardTransactionReceipt"
                        >
                            Transaction receipt
                        </Text>
                        <ArrowTopRightIcon
                            w="14px"
                            h="14px"
                            margin="0 !important"
                            color={gray10}
                        />
                    </HStack>
                </Link>
            )}
        </VStack>
    );
};

export default SwapCardSellCTAContainer;
