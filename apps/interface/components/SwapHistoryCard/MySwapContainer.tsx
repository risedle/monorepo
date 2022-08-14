import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

// Hooks
import { useFuseLeveragedTokenMySwap } from "@/hooks/useFuseLeveragedTokenMySwap";

// Sub-components
import SwapHistoryCardTable from "./Table";

// Utils
import type { FuseLeveragedTokenSwap } from "@/utils/types";
import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react";

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

const ErrorMessageBox = ({ children }: { children: React.ReactNode }) => {
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    return (
        <Center>
            <Box
                fontSize="sm"
                background={gray3}
                px={"16px"}
                py={"8px"}
                borderRadius={"xl"}
                data-testid="warningErrorBox"
            >
                <Text color={gray10}>{children}</Text>
            </Box>
        </Center>
    );
};

export const MySwapHistoryContainer = (props: MySwapHisotryContainerProps) => {
    const { symbol } = props;
    const { address } = useAccount();
    const { data, isLoaded } = useFuseLeveragedTokenMySwap(symbol, address);
    const [loadedData, setLoadedData] = useState<FuseLeveragedTokenSwap[]>(
        Array.from(Array(5).keys()).map(() => dummyData)
    );

    useEffect(() => {
        if (data?.user.length && isLoaded) {
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
            setLoadedData(() => mappedData);
        }
    }, [data?.user, isLoaded]);

    if (!address) {
        return <ErrorMessageBox>Wallet Not Connected</ErrorMessageBox>;
    }
    if (!data?.user.length && isLoaded) {
        return <ErrorMessageBox>No Swap History</ErrorMessageBox>;
    }

    return <SwapHistoryCardTable swaps={loadedData} isLoaded={isLoaded} />;
};

export default MySwapHistoryContainer;
