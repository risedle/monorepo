import { TokenCardInfo } from "./index";
import { useFuseLeveragedTokenInfo } from "../../hooks/useFuseLeveragedTokenInfo";

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
            price={data?.priceUSD}
            priceChangePercent={data?.dailyPriceChangePercentage}
            marketCap={data?.marketcapUSD}
            isLoaded
        />
    );
};
