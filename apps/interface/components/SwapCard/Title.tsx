import {
    Flex,
    VStack,
    HStack,
    Text,
    Spacer,
    useColorModeValue,
} from "@chakra-ui/react";

import ChainIcon from "../Icons/Chain";
import FuseLeveragedTokenIcon from "../Icons/FuseLeveragedToken";

interface SwapCardTitleProps {
    name: string;
    symbol: string;
}

export const SwapCardTitle = (props: SwapCardTitleProps) => {
    // Data
    const { name, symbol } = props;

    // Styles
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
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
    );
};

export default SwapCardTitle;
