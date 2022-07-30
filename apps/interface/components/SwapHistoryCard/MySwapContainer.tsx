import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

// Hooks
import useFuseLeveragedTokenSwap from "@/hooks/useFuseLeveragedTokenSwap";

// Sub-components
import SwapHistoryCardTable from "./Table";
import type { FuseLeveragedTokenSwap as IsgFuse } from "@/utils/types";
import { FuseLeveragedTokenSwap } from "@/../../packages/types/dist";

interface MySwapHisotryContainerProps {
    symbol: string;
}

const dummyData: IsgFuse = {
    amountInUSD: "0",
    timestamp: "0",
    tokenIn: {
        symbol: "",
    },
    tokenOut: {
        symbol: "",
    },
    transaction: {
        id: "",
    },
};

export const MySwapHistoryContainer = (props: MySwapHisotryContainerProps) => {
    const { symbol } = props;
    const { address } = useAccount();
    const { data, isLoaded } = useFuseLeveragedTokenSwap(symbol, address);
    const [loadedData, setLoadedData] = useState<IsgFuse[]>(
        Array.from(Array(5).keys()).map(() => dummyData)
    );

    useEffect(() => {
        if (isLoaded && data) {
            const mappedData: Array<IsgFuse> = data.user.map(
                (userData: FuseLeveragedTokenSwap) => ({
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
    }, [data, isLoaded]);

    return <SwapHistoryCardTable swaps={loadedData} isLoaded={isLoaded} />;
};

export default MySwapHistoryContainer;
