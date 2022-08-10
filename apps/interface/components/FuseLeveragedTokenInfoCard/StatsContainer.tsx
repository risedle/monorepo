import { BoxProps } from "@chakra-ui/react";

// Hooks
import useFuseLeveragedTokenInfo from "@/hooks/useFuseLeveragedTokenInfo";

// Sub-components
import FuseLeveragedTokenInfoCardStats from "./Stats";

interface FuseLeveragedTokenInfoCardStatsContainerProps extends BoxProps {
    symbol: string;
    collateralSymbol: string;
    debtSymbol: string;
    address: string;
}

const FuseLeveragedTokenInfoCardStatsContainer = (
    props: FuseLeveragedTokenInfoCardStatsContainerProps
) => {
    const { symbol, collateralSymbol, debtSymbol, address, ...boxProps } =
        props;
    const { data, isLoaded } = useFuseLeveragedTokenInfo(symbol);
    // TODO: add toast when error is not null

    return (
        <FuseLeveragedTokenInfoCardStats
            isLoaded={isLoaded}
            marketcapUSD={data?.marketcapUSD || 0}
            maxMarketcapUSD={data?.maxMarketcapUSD || 0}
            totalVolumeUSD={data?.totalVolumeUSD || 0}
            collateralSymbol={collateralSymbol}
            debtSymbol={debtSymbol}
            address={address}
            {...boxProps}
        />
    );
};

export default FuseLeveragedTokenInfoCardStatsContainer;
