import { BoxProps } from "@chakra-ui/react";
import { useAccount } from "wagmi";

// Sub-components
import SwapCardBalance from "./Balance";

// Hooks
import useFuseLeveragedTokenUserPosition from "@/hooks/useFuseLeveragedTokenUserPosition";

interface SwapCardBuyBalanceContainerProps extends BoxProps {
    fltAddress: string;
}

export const SwapCardBuyBalanceContainer = (
    props: SwapCardBuyBalanceContainerProps
) => {
    const { fltAddress, ...boxProps } = props;

    // Get connected user
    const { address } = useAccount();
    const { data, isLoaded } = useFuseLeveragedTokenUserPosition(
        fltAddress,
        address
    );

    return (
        <SwapCardBalance
            amount={data?.balance || 0}
            amountUSD={data?.usd || 0}
            isLoaded={isLoaded}
            {...boxProps}
        />
    );
};

export default SwapCardBuyBalanceContainer;
