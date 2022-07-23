import {
    VStack,
    Flex,
    Spacer,
    HStack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import { FuseLeveragedToken } from "../../utils/types";
import ChainIcon from "../Icons/Chain";
import FuseLeveragedTokenIcon from "../Icons/FuseLeveragedToken";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SwapProps extends FuseLeveragedToken {}

export const SwapCard = (props: SwapProps) => {
    const { name, symbol } = props;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack
            data-testid="SwapCard"
            alignItems="flex-start"
            padding="4"
            background={gray2}
            borderRadius="2xl"
        >
            {/* Swap Card Title */}
            <Flex data-testid="SwapCardTitle" width="100%">
                <VStack alignItems="flex-start" gap="2">
                    <Text fontSize="sm" lineHeight="4" color={gray10}>
                        {name}
                    </Text>
                    <HStack marginTop="0 !important" gap="1">
                        <Text
                            fontSize="2xl"
                            lineHeight="8"
                            color={gray12}
                            letterSpacing="tight"
                            fontWeight="bold"
                        >
                            {symbol}
                        </Text>
                        <ChainIcon
                            w="6"
                            h="6"
                            color={gray10}
                            margin="0 !important"
                        />
                    </HStack>
                </VStack>
                <Spacer />
                <FuseLeveragedTokenIcon name={name} symbol={symbol} />
            </Flex>
        </VStack>
    );
};

export default SwapCard;
