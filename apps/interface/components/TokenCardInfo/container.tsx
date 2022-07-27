import { TokenCardInfo } from "./index";
import { useFuseLeveragedTokenInfo } from "@/hooks/useFuseLeveragedTokenInfo";

/**
 * Container component handle state such as fething data from API
 */

interface TokenCardInfoContainerProps {
    symbol: string;
}

export const TokenCardInfoContainer = (props: TokenCardInfoContainerProps) => {
    // Data
    const { symbol } = props;
    const { data, isLoaded } = useFuseLeveragedTokenInfo(symbol);

    // TODO(pyk): show toast when error happen
    return (
        <TokenCardInfo
            price={data?.priceUSD || 0}
            priceChangePercent={data?.dailyPriceChangePercentage || 0}
            marketCap={data?.marketcapUSD || 0}
            isLoaded={isLoaded}
        />
    );
};
