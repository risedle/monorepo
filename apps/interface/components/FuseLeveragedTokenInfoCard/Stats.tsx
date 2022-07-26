import {
    BoxProps,
    Flex,
    VStack,
    Text,
    Skeleton,
    useColorModeValue,
    HStack,
} from "@chakra-ui/react";

// Utils
import formatUSD from "../../utils/formatUSD";

// Sub-components
import InfoTooltip from "../InfoTooltip";

interface FuseLeveragedTokenInfoCardStatsProps extends BoxProps {
    marketCapUSD: number;
    maxMarketCapUSD: number;
    totalVolumeUSD: number;
    collateralSymbol: string;
    debtSymbol: string;
    isLoaded: boolean;
}
export const FuseLeveragedTokenInfoCardStats = (
    props: FuseLeveragedTokenInfoCardStatsProps
) => {
    // Data
    const {
        marketCapUSD,
        maxMarketCapUSD,
        collateralSymbol,
        debtSymbol,
        totalVolumeUSD,
        isLoaded,
        ...boxProps
    } = props;

    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const green11 = useColorModeValue("green.light.11", "green.dark.11");

    return (
        <VStack
            data-testid="FuseLeveragedTokenInfoCardStats"
            width="100%"
            margin="0 !important"
            gap={6}
            {...boxProps}
        >
            <Flex width="100%" alignItems="flex-start">
                <VStack flex="1" alignItems="flex-start" gap={2}>
                    <HStack gap={1}>
                        <Text fontSize="sm" lineHeight="4" color={gray10}>
                            Market cap
                        </Text>
                        <InfoTooltip
                            info="Total circulating supply times current price"
                            color={gray10}
                        />
                    </HStack>
                    <Skeleton
                        startColor={gray3}
                        endColor={gray4}
                        borderRadius="lg"
                        isLoaded={isLoaded}
                        margin="0 !important"
                    >
                        <Text
                            fontFamily="mono"
                            fontSize="sm"
                            lineHeight="4"
                            fontWeight="semibold"
                            letterSpacing="tight"
                            margin="0 !important"
                            color={gray12}
                            minW="24"
                        >
                            {formatUSD(marketCapUSD)}
                        </Text>
                    </Skeleton>
                </VStack>
                <VStack flex="1" alignItems="flex-start" gap={2}>
                    <HStack gap={1}>
                        <Text fontSize="sm" lineHeight="4" color={gray10}>
                            Underlying assets
                        </Text>
                        <InfoTooltip
                            info="Collateral and debt assets"
                            color={gray10}
                        />
                    </HStack>
                    <Text
                        fontSize="sm"
                        lineHeight="4"
                        color={gray12}
                        margin="0 !important"
                        fontFamily="mono"
                    >
                        {collateralSymbol}, {debtSymbol}
                    </Text>
                </VStack>
                <VStack flex="1" alignItems="flex-start" gap={2}>
                    <HStack gap={1}>
                        <Text fontSize="sm" lineHeight="4" color={gray10}>
                            Volume
                        </Text>
                        <InfoTooltip info="Total volume" color={gray10} />
                    </HStack>
                    <Skeleton
                        startColor={gray3}
                        endColor={gray4}
                        borderRadius="lg"
                        isLoaded={isLoaded}
                        margin="0 !important"
                    >
                        <Text
                            fontFamily="mono"
                            fontSize="sm"
                            lineHeight="4"
                            fontWeight="semibold"
                            letterSpacing="tight"
                            margin="0 !important"
                            color={gray12}
                            minW="24"
                        >
                            {formatUSD(totalVolumeUSD)}
                        </Text>
                    </Skeleton>
                </VStack>
            </Flex>
            <Flex margin="0 !important" width="100%" alignItems="flex-start">
                <VStack flex="1" alignItems="flex-start" gap={2}>
                    <Text fontSize="sm" lineHeight="4" color={gray10}>
                        Management fees
                    </Text>
                    <Text
                        fontFamily="mono"
                        fontSize="sm"
                        lineHeight="4"
                        fontWeight="semibold"
                        letterSpacing="tight"
                        margin="0 !important"
                        color={green11}
                    >
                        FREE
                    </Text>
                </VStack>
                <VStack flex="1" alignItems="flex-start" gap={2}>
                    <Text fontSize="sm" lineHeight="4" color={gray10}>
                        Trading fees
                    </Text>
                    <Text
                        fontSize="sm"
                        lineHeight="4"
                        color={gray12}
                        margin="0 !important"
                        fontFamily="mono"
                    >
                        0.1%
                    </Text>
                </VStack>
                <VStack flex="1" alignItems="flex-start" gap={2}>
                    <HStack gap={1}>
                        <Text fontSize="sm" lineHeight="4" color={gray10}>
                            Capacity
                        </Text>
                        <InfoTooltip info="Max Market cap" color={gray10} />
                    </HStack>
                    <Skeleton
                        startColor={gray3}
                        endColor={gray4}
                        borderRadius="lg"
                        isLoaded={isLoaded}
                        margin="0 !important"
                        minW="24"
                    >
                        <Text
                            fontFamily="mono"
                            fontSize="sm"
                            lineHeight="4"
                            fontWeight="semibold"
                            letterSpacing="tight"
                            margin="0 !important"
                            color={gray12}
                        >
                            {formatUSD(maxMarketCapUSD)}
                        </Text>
                    </Skeleton>
                </VStack>
            </Flex>
        </VStack>
    );
};

export default FuseLeveragedTokenInfoCardStats;
