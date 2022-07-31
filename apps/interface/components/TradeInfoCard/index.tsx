import {
    VStack,
    Box,
    BoxProps,
    Divider,
    useColorModeValue,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Lorem,
    ModalFooter,
    Text,
} from "@chakra-ui/react";

// Utils
import type { FuseLeveragedToken } from "@/utils/types";
import getBaseConfig from "@/utils/getBaseConfig";

// Sub-components
import TradeInfoCardTitle from "./Title";
import TradeInfoCardLatestPriceContainer from "./LatestPriceContainer";
import PriceChart from "../PriceChart";
import TradeInfoCardUserPositionContainer from "./UserPositionContainer";
import SwapCard from "@/components/SwapCard";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TradeInfoCardProps extends BoxProps {
    flt: FuseLeveragedToken;
}

export const TradeInfoCard = (props: TradeInfoCardProps) => {
    // Data
    const { chainSlug } = getBaseConfig();
    const { flt, ...boxProps } = props;
    const { name, symbol, prices, address } = flt;

    // Hooks
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Create timeframes
    const chartPrices = prices.map((price) => ({
        timestamp: price.timestamp,
        price: parseFloat(price.close),
    }));
    const timeframes = {
        "1D": { prices: chartPrices.slice(0, 25).reverse() },
        "1W": { prices: chartPrices.slice(0, 24 * 7 + 1).reverse() },
        "2W": { prices: chartPrices.slice(0, 24 * 7 * 2 + 1).reverse() },
        "3W": { prices: chartPrices.slice(0, 24 * 7 * 3 + 1).reverse() },
        "1M": { prices: chartPrices.reverse() },
    };

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const blur = useColorModeValue("rgba(22,22,22,0.6)", "rgba(0,0,0,0.6)");

    return (
        <VStack
            data-testid="TradeInfoCard"
            alignItems="flex-start"
            background={gray2}
            borderRadius="2xl"
            gap={4}
            {...boxProps}
        >
            {/* Swap Card Title */}
            <TradeInfoCardTitle
                name={name}
                symbol={symbol}
                paddingX="4"
                paddingTop="4"
            />

            {/* Swap Card Latest Price Info */}
            <TradeInfoCardLatestPriceContainer symbol={symbol} paddingX="4" />

            {/* Show price chart */}
            {/* The props 'display' and 'justifyContent' is used to prevent timeframes stretch in trade page */}
            <PriceChart
                timeframes={timeframes}
                display="flex"
                justifyContent={{ base: "center", laptop: "start" }}
            />

            <Box
                width="100%"
                paddingX="4"
                margin="0 !important"
                display={{ base: "block", laptop: "none" }}
            >
                <Divider borderStyle="dashed" borderColor={gray5} />
            </Box>

            {/* Show user position */}
            <TradeInfoCardUserPositionContainer
                paddingX="4"
                paddingTop="2"
                paddingBottom={{ base: "0", laptop: "4" }}
                fltAddress={address}
            />

            {/* Show swap button on tablet or smaller */}
            <Box
                width="100%"
                paddingX="4"
                paddingBottom="4"
                margin="0 !important"
                display={{ base: "block", laptop: "none" }}
            >
                <Button width="100%" variant={chainSlug} onClick={onOpen}>
                    Swap
                </Button>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    display={{ base: "block", laptop: "none" }}
                >
                    <ModalOverlay
                        background={blur}
                        backdropFilter="blur(12px)"
                        display={{ base: "block", laptop: "none" }}
                    />
                    <ModalContent
                        position="absolute"
                        bottom="0"
                        marginBottom="64px"
                        background="transparent"
                        width="100%"
                        paddingX="4"
                        maxWidth="none"
                        display={{ base: "block", laptop: "none" }}
                    >
                        <SwapCard flt={flt} />
                    </ModalContent>
                </Modal>
            </Box>
        </VStack>
    );
};

export default TradeInfoCard;
