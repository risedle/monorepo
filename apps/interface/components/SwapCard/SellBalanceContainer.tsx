import { BoxProps, HStack } from "@chakra-ui/react";
import { useAccount } from "wagmi";

// Sub-components
import SwapCardBalance from "./Balance";
import SwapCardMaxButton from "./MaxButton";

// Hooks
import useFuseLeveragedTokenUserPosition from "@/hooks/useFuseLeveragedTokenUserPosition";
import useSellAmountStore from "@/hooks/useSellAmountStore";

interface SwapCardSellBalanceContainerProps extends BoxProps {
    fltAddress: string;
}

const SwapCardSellBalanceContainer = (
    props: SwapCardSellBalanceContainerProps
) => {
    const { fltAddress, ...boxProps } = props;

    const setAmount = useSellAmountStore((state) => state.setAmount);

    // Get connected user
    const { address } = useAccount();
    const { data, isLoaded } = useFuseLeveragedTokenUserPosition(
        fltAddress,
        address
    );

    return (
        <HStack
            margin="0 !important"
            gap={1}
            paddingX="4"
            data-testid="SwapCardSellBalanceContainer"
        >
            <SwapCardBalance
                amount={data?.balance || 0}
                amountUSD={data?.usd || 0}
                isLoaded={isLoaded}
                {...boxProps}
            />
            {/* TODO(pyk): how to test the callback? */}
            <SwapCardMaxButton
                onClick={() => setAmount((data?.balance || 0) + "")}
            />
        </HStack>
    );
};

export default SwapCardSellBalanceContainer;
