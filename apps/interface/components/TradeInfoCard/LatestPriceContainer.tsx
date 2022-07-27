import { BoxProps } from "@chakra-ui/react";

// Sub-components
import { TradeInfoCardLatestPrice } from "./LatestPrice";
import { useFuseLeveragedTokenInfo } from "@/hooks/useFuseLeveragedTokenInfo";

/**
 * Container is a special component that handle state such as fething data from API
 */

interface TradeInfoCardLatestPriceContainerProps extends BoxProps {
    symbol: string;
}

export const TradeInfoCardLatestPriceContainer = (
    props: TradeInfoCardLatestPriceContainerProps
) => {
    // Data
    const { symbol } = props;
    const { data, isLoaded } = useFuseLeveragedTokenInfo(symbol);

    // TODO(pyk): show toast when error happen

    return (
        <TradeInfoCardLatestPrice
            price={data?.priceUSD || 0}
            priceChangeUSD={data?.dailyPriceChangeUSD || 0}
            priceChangePercent={data?.dailyPriceChangePercentage || 0}
            isLoaded={isLoaded}
            {...props}
        />
    );
};

export default TradeInfoCardLatestPriceContainer;
