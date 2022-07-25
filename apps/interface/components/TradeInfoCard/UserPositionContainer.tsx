import { BoxProps } from "@chakra-ui/react";
import { useAccount } from "wagmi";

// Sub-components
import TradeInfoCardUserPosition from "./UserPosition";

// Hooks
import useFuseLeveragedTokenUserPosition from "../../hooks/useFuseLeveragedTokenUserPosition";

interface TradeInfoCardUserPositionProps extends BoxProps {
    fltAddress: string;
}

export const TradeInfoCardUserPositionContainer = (
    props: TradeInfoCardUserPositionProps
) => {
    const { fltAddress, ...boxProps } = props;
    console.log("DEBUG: TradeInfoCardUserPositionContainer", fltAddress);

    // Get connected user
    const { address } = useAccount();
    const { data, isLoaded } = useFuseLeveragedTokenUserPosition(
        fltAddress,
        address
    );

    return (
        <TradeInfoCardUserPosition
            balance={data?.balance || 0}
            valueUSD={data?.usd || 0}
            pnlPercent={data?.pnlPercent || 0}
            pnlUSD={data?.pnlUSD || 0}
            isLoaded={isLoaded}
            {...boxProps}
        />
    );
};

export default TradeInfoCardUserPositionContainer;
