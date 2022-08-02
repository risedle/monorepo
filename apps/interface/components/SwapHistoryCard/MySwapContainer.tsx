import { useEffect, useState } from "react";
import { chainId, useAccount } from "wagmi";

// Hooks
import { useFuseLeveragedTokenMySwap } from "@/hooks/useFuseLeveragedTokenMySwap";

// Sub-components
import SwapHistoryCardTable from "./Table";

// Utils
import type { FuseLeveragedTokenSwap } from "@/utils/types";
import { Heading } from "@chakra-ui/react";
import getBaseConfig from "@/utils/getBaseConfig";

interface MySwapHisotryContainerProps {
    symbol: string;
}

const dummyData = {
    amountInUSD: "0",
    timestamp: "1659328398",
    tokenIn: {
        symbol: "BNBRISE",
    },
    tokenOut: {
        symbol: "BUSD",
    },
    transaction: {
        id: "",
    },
};

export const MySwapHistoryContainer = (props: MySwapHisotryContainerProps) => {
    const { symbol } = props;
    const { address } = useAccount();
    const { data, isLoaded } = useFuseLeveragedTokenMySwap(symbol, address);
    const [loadedData, setLoadedData] = useState<FuseLeveragedTokenSwap[]>(
        Array.from(Array(5).keys()).map(() => dummyData)
    );

    useEffect(() => {
        if (data?.user && !isLoaded) {
            const mappedData: Array<FuseLeveragedTokenSwap> = data.user.map(
                (userData) => ({
                    amountInUSD: userData.amountInUSD.toString(),
                    timestamp: userData.timestamp.toString(),
                    tokenIn: {
                        symbol: userData.tokenIn.symbol,
                    },
                    tokenOut: {
                        symbol: userData.tokenOut.symbol,
                    },
                    transaction: {
                        id: userData.hash,
                    },
                })
            );
            setLoadedData(mappedData);
        }
    }, [data?.user, isLoaded]);

    if (!address) {
        return (
            <Heading data-testid="walletNotConnectedWarning">
                Wallet Not Connected
            </Heading>
        );
    }
    if (!data?.user && !isLoaded) {
        return (
            <Heading data-testid="noSwapHistoryWarning">
                No Swap History
            </Heading>
        );
    }

    return <SwapHistoryCardTable swaps={loadedData} isLoaded={isLoaded} />;
};

export default MySwapHistoryContainer;
