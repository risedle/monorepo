/**
 * This is custom radio for pre-defined slippage tolerance
 *
 * See docs here:
 * https://chakra-ui.com/docs/components/radio#custom-radio-buttons
 */
import {
    RadioProps,
    useRadio,
    Box,
    chakra,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

interface SlippageToleranceRadioProps extends RadioProps {
    slippage: string;
}

export const SlippageToleranceRadio = (props: SlippageToleranceRadioProps) => {
    // Data
    const { slippage, ...radioProps } = props;
    const { getInputProps, getCheckboxProps, htmlProps } =
        useRadio(radioProps);

    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray6 = useColorModeValue("gray.light.6", "gray.dark.6");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <chakra.label {...htmlProps} cursor="pointer" margin="0 !important">
            <input {...getInputProps({})} hidden />
            <Box
                {...getCheckboxProps()}
                background={gray3}
                borderRadius="lg"
                padding="2"
                border="1px"
                borderColor={gray3}
                color={gray10}
                _checked={{
                    borderColor: gray6,
                    color: gray12,
                }}
                _hover={{
                    borderColor: gray6,
                    color: gray12,
                }}
            >
                <Text
                    fontSize="sm"
                    lineHeight="4"
                    fontWeight="semibold"
                    fontFamily="mono"
                    letterSpacing="tight"
                >
                    {parseFloat(slippage) * 100}%
                </Text>
            </Box>
        </chakra.label>
    );
};

export default SlippageToleranceRadio;
