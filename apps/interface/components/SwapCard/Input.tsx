import {
    BoxProps,
    NumberInput,
    NumberInputField,
    useColorModeValue,
    Flex,
    Text,
} from "@chakra-ui/react";

interface SwapCardInputProps extends BoxProps {
    symbol: string;
}

export const SwapCardInput = (props: SwapCardInputProps) => {
    // Data
    const { symbol } = props;

    // Styles
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <NumberInput
            data-testid="SwapCardInputAmount"
            paddingX="4"
            margin="0 !important"
            width="100%"
        >
            <Flex alignItems="center">
                <NumberInputField
                    data-testid="SwapCardInputAmountField"
                    padding="0"
                    border="0"
                    fontFamily="mono"
                    fontWeight="semibold"
                    fontSize="xl"
                    letterSpacing="tight"
                    lineHeight="6"
                    height="6"
                    placeholder="0"
                    borderRadius="0"
                    _placeholder={{ color: gray10 }}
                    _focusVisible={{ border: "0", color: gray12 }}
                />

                <Text
                    fontSize="md"
                    lineHeight="4"
                    letterSpacing="tight"
                    fontFamily="mono"
                    color={gray10}
                >
                    {symbol}
                </Text>
            </Flex>
        </NumberInput>
    );
};

export default SwapCardInput;
