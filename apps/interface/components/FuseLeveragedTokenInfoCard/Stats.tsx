import {
    BoxProps,
    Flex,
    VStack,
    Text,
    Skeleton,
    useColorModeValue,
    HStack,
    Link,
    Center,
} from "@chakra-ui/react";
import { utils } from "ethers";

// Utils
import getBaseConfig from "@/utils/getBaseConfig";
import formatUSD from "@/utils/formatUSD";
import getTokenExplorerURL from "@/utils/getTokenExplorerURL";
import formatTokenAddress from "@/utils/formatTokenAddress";

// Sub-components
import InfoTooltip from "../InfoTooltip";
import ArrowTopRightIcon from "../Icons/ArrowTopRight";

interface FuseLeveragedTokenInfoCardStatsProps extends BoxProps {
    marketcapUSD: number;
    maxMarketcapUSD: number;
    totalVolumeUSD: number;
    collateralSymbol: string;
    debtSymbol: string;
    isLoaded: boolean;
    address: string;
}
export const FuseLeveragedTokenInfoCardStats = (
    props: FuseLeveragedTokenInfoCardStatsProps
) => {
    // Global config
    const { explorerName } = getBaseConfig();

    // Data
    const {
        marketcapUSD,
        maxMarketcapUSD,
        collateralSymbol,
        debtSymbol,
        totalVolumeUSD,
        isLoaded,
        address,
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
                            {formatUSD(marketcapUSD)}
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
                            {explorerName}
                        </Text>
                    </HStack>
                    <Skeleton
                        startColor={gray3}
                        endColor={gray4}
                        borderRadius="lg"
                        isLoaded={isLoaded}
                        margin="0 !important"
                        minW="24"
                    >
                        <Link
                            href={getTokenExplorerURL(address)}
                            target="_blank"
                            margin="0 !important"
                            _hover={{ textDecoration: "none" }}
                        >
                            <Center>
                                <Text
                                    fontFamily="mono"
                                    fontSize="sm"
                                    lineHeight="4"
                                    letterSpacing="tight"
                                    color={gray12}
                                >
                                    {formatTokenAddress(
                                        utils.getAddress(address)
                                    )}
                                </Text>
                                <ArrowTopRightIcon
                                    w="4"
                                    h="4"
                                    color={gray10}
                                />
                            </Center>
                        </Link>
                    </Skeleton>
                </VStack>
            </Flex>
        </VStack>
    );
};

export default FuseLeveragedTokenInfoCardStats;
