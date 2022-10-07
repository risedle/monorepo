import {
    BoxProps,
    HStack,
    Text,
    useColorModeValue,
    Skeleton,
} from "@chakra-ui/react";

// Utils
import formatUSD from "@/utils/formatUSD";
import formatTokenBalance from "@/utils/formatTokenBalance";

// Icons
import WalletIcon from "@/components/Icons/Wallet";

interface SwapCardBalanceProps extends BoxProps {
    amount: number;
    amountUSD: number;
    isLoaded: boolean;
}

const SwapCardBalance = (props: SwapCardBalanceProps) => {
    // Data
    const { amount, amountUSD, isLoaded, ...boxProps } = props;

    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");

    return (
        <Skeleton
            data-testid="SwapCardBalance"
            margin="0 !important"
            {...boxProps}
            isLoaded={isLoaded}
            startColor={gray3}
            endColor={gray4}
            borderRadius="lg"
        >
            <HStack gap={1}>
                <WalletIcon w="4" h="4" color={gray10} />
                <Text
                    data-testid="BalanceAmount"
                    fontSize="xs"
                    lineHeight="4"
                    color={gray10}
                    margin="0 !important"
                >
                    {formatTokenBalance(amount)} &asymp; {formatUSD(amountUSD)}
                </Text>
            </HStack>
        </Skeleton>
    );
};

export default SwapCardBalance;
