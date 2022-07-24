import { BoxProps } from "@chakra-ui/react";

// Sub-components
import { SwapCardLatestPriceInfo } from "./LatestPriceInfo";
import { useFuseLeveragedTokenInfo } from "../../hooks/useFuseLeveragedTokenInfo";

/**
 * Container is a special component that handle state such as fething data from API
 */

interface SwapCardLatestPriceInfoContainerProps extends BoxProps {
    symbol: string;
}

export const SwapCardLatestPriceInfoContainer = (
    props: SwapCardLatestPriceInfoContainerProps
) => {
    // Data
    const { symbol } = props;
    const { data, isLoaded } = useFuseLeveragedTokenInfo(symbol);

    // TODO(pyk): show toast when error happen

    return (
        <SwapCardLatestPriceInfo
            price={data?.priceUSD || 0}
            priceChangeUSD={data?.dailyPriceChangeUSD || 0}
            priceChangePercent={data?.dailyPriceChangePercentage || 0}
            isLoaded={isLoaded}
            {...props}
        />
    );
};

export default SwapCardLatestPriceInfoContainer;
