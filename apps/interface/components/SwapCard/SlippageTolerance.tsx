import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    useColorModeValue,
    Flex,
    Spacer,
    Text,
    HStack,
    NumberInput,
    NumberInputField,
} from "@chakra-ui/react";

// Icons
import ChevronDownIcon from "@/components/Icons/ChevronDown";
import ChevronUpIcon from "@/components/Icons/ChevronUp";

// Sub-components
import InfoTooltip from "@/components/InfoTooltip";
import SlippageToleranceRadioGroup from "./SlippageToleranceRadioGroup";

// Utils
import isValidInputAmount from "@/utils/isValidInputAmount";
import parseSlippageTolerance from "@/utils/parseSlippageTolerance";

interface SwapCardSlippageToleranceProps {
    slippage: string; // "0" -> 0%, "100" -> 100%
    setSlippage: (slippage: string) => void;
}

const SwapCardSlippageTolerance = (props: SwapCardSlippageToleranceProps) => {
    // Data
    const { slippage, setSlippage } = props;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray6 = useColorModeValue("gray.light.6", "gray.dark.6");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const red11 = useColorModeValue("red.light.11", "red.dark.11");

    return (
        <Accordion
            allowToggle
            data-testid="SwapCardSlippageTolerance"
            width="100%"
            margin="0 !important"
            background={gray2}
        >
            <AccordionItem border="0">
                {({ isExpanded }: { isExpanded: boolean }) => (
                    <>
                        <h2>
                            <AccordionButton
                                data-testid="SwapCardSlippageToleranceToggle"
                                padding="4"
                            >
                                <Flex width="100%" alignItems="center">
                                    <HStack gap={1}>
                                        <Text
                                            flex="1"
                                            fontSize="xs"
                                            lineHeight="4"
                                            color={gray10}
                                            textAlign="left"
                                        >
                                            Slippage tolerance
                                        </Text>
                                        <InfoTooltip
                                            info="Your transaction will revert if the price changes unfavorably more than this percentage"
                                            color={gray10}
                                        />
                                    </HStack>
                                    <Spacer />
                                    <HStack gap={1}>
                                        {isExpanded ? (
                                            <ChevronUpIcon
                                                w="4"
                                                h="4"
                                                color={gray10}
                                            />
                                        ) : (
                                            <ChevronDownIcon
                                                w="4"
                                                h="4"
                                                color={gray10}
                                            />
                                        )}
                                        <Text
                                            margin="0 !important"
                                            fontSize="md"
                                            lineHeight="4"
                                            fontWeight="semibold"
                                            fontFamily="mono"
                                        >
                                            {parseFloat(
                                                slippage || "0"
                                            ).toFixed(2)}
                                            %
                                        </Text>
                                    </HStack>
                                </Flex>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            data-testid="SwapCardSlippageTolerancePanel"
                            paddingTop="0"
                            paddingBottom="4"
                            paddingX="4"
                        >
                            <Flex alignItems="center" gap="2">
                                {/* Pre-defined slippage */}
                                <SlippageToleranceRadioGroup
                                    slippage={slippage}
                                    slippages={["0.8", "1", "2"]}
                                    setSlippage={setSlippage}
                                />

                                {/* Custom slippage input */}
                                <NumberInput
                                    data-testid="SlippageToleranceCustomInput"
                                    precision={2}
                                    step={0.01}
                                    value={slippage}
                                    onChange={parseSlippageTolerance(
                                        setSlippage
                                    )}
                                    max={100}
                                    min={0}
                                    // Allow user to input comma
                                    isValidCharacter={isValidInputAmount}
                                >
                                    <NumberInputField
                                        data-testid="SlippageToleranceCustomInputField"
                                        background={gray3}
                                        padding="2"
                                        border="1px"
                                        borderColor={gray3}
                                        fontFamily="mono"
                                        fontWeight="semibold"
                                        fontSize="sm"
                                        letterSpacing="tight"
                                        lineHeight="4"
                                        height="max"
                                        placeholder="0"
                                        borderRadius="lg"
                                        textAlign="right"
                                        _placeholder={{ color: gray10 }}
                                        _hover={{
                                            borderColor: gray6,
                                        }}
                                        _focusVisible={{
                                            color: gray12,
                                            borderColor: gray6,
                                        }}
                                        _invalid={{
                                            color: red11,
                                            borderColor: red11,
                                        }}
                                    />
                                </NumberInput>
                            </Flex>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
};

export default SwapCardSlippageTolerance;
