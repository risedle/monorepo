import {
    BoxProps,
    VStack,
    Text,
    HStack,
    useColorModeValue,
    Link,
    Center,
    Tooltip,
    Divider,
} from "@chakra-ui/react";
import { utils } from "ethers";

// Utils
import type { FuseLeveragedToken } from "../../utils/types";
import getBaseConfig from "../../utils/getBaseConfig";
import getTokenExplorerURL from "../../utils/getTokenExplorerURL";
import formatTokenAddress from "../../utils/formatTokenAddress";

// Icons
import GlobeIcon from "../Icons/Globe";
import ArrowTopRightIcon from "../Icons/ArrowTopRight";

// Sub-components
import FuseLeveragedTokenInfoCardStats from "./Stats";

interface FuseLeveragedTokenInfoCardProps extends BoxProps {
    flt: FuseLeveragedToken;
}

export const FuseLeveragedTokenInfoCard = (
    props: FuseLeveragedTokenInfoCardProps
) => {
    // Global config
    const { explorerName } = getBaseConfig();

    // Data
    const { flt, ...boxProps } = props;
    const { name, symbol, address, collateral, debt } = flt;
    console.log(flt);

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack
            data-testid="FuseLeveragedTokenInfoCard"
            alignItems="flex-start"
            background={gray2}
            borderRadius="2xl"
            gap={6}
            margin="0 !important"
            {...boxProps}
        >
            {/* Title */}
            <Text
                color={gray12}
                fontWeight="bold"
                fontSize="md"
                lineHeight="4"
                paddingX="4"
                paddingTop="4"
            >
                Overview
            </Text>

            {/* Description */}
            <VStack margin="0 !important" paddingX="4" gap={6}>
                <Text color={gray10} fontSize="sm" lineHeight="6">
                    {symbol} ({name}) is a derivatives product with no margin
                    or liquidation risks. It provides you with leveraged
                    exposure to the underlying asset, which may amplify
                    profitability and potential losses. {symbol} is backed by
                    real assets and can be redeemed at anytime.
                </Text>
                <Text
                    color={gray10}
                    fontSize="sm"
                    lineHeight="6"
                    margin="0 !important"
                >
                    Due to the rebalancing mechanism, the {symbol} are more
                    suitable for short-term investment in a one-sided market.
                    In a volatile market, the actual leverage may frequently
                    exceed the target leverage range. This means that the
                    rebalancing mechanism will be triggered accordingly in
                    order to maintain leverage within the target range. Thus,{" "}
                    {symbol} are not suitable for long-term investments.
                </Text>
            </VStack>

            {/* Contract Link */}
            <HStack margin="0 !important" paddingX="4" gap={2}>
                <GlobeIcon w="4" h="4" />
                <Text
                    color={gray10}
                    fontSize="sm"
                    lineHeight="4"
                    margin="0 !important"
                >
                    {explorerName}
                </Text>
                <Tooltip
                    label="Don't trust, verify"
                    placement="top"
                    background={gray12}
                    color={gray2}
                    boxShadow="none"
                    data-testid="InfoTooltip"
                    fontSize="sm"
                    lineHeight="4"
                    borderRadius="lg"
                    padding="2"
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
                                {formatTokenAddress(utils.getAddress(address))}
                            </Text>
                            <ArrowTopRightIcon w="4" h="4" color={gray10} />
                        </Center>
                    </Link>
                </Tooltip>
            </HStack>

            {/* Divider */}
            <Divider
                borderStyle="dashed"
                borderColor={gray5}
                margin="0 !important"
            />

            {/* Stats */}
            <FuseLeveragedTokenInfoCardStats
                isLoaded={false}
                paddingX="4"
                paddingBottom="4"
                marketCapUSD={0}
                totalVolumeUSD={0}
                maxMarketCapUSD={0}
                collateralSymbol={collateral.symbol}
                debtSymbol={debt.symbol}
            />
        </VStack>
    );
};
