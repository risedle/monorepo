import {
    BoxProps,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    useColorModeValue,
    Text,
    HStack,
    Flex,
    VStack,
    StackDivider,
} from "@chakra-ui/react";

// Utils
import type { FuseLeveragedTokenBacking } from "@/utils/types";
import formatDate from "@/utils/formatDate";
import formatTokenBalance from "@/utils/formatTokenBalance";

// Icons
import CheckmarkIcon from "@/components/Icons/Checkmark";

// Sub-components
import InfoTooltip from "@/components/InfoTooltip";

interface BackingCardHistoryProps extends BoxProps {
    collateralSymbol: string;
    debtSymbol: string;
    backings: Array<FuseLeveragedTokenBacking>;
}

export const BackingCardHistory = (props: BackingCardHistoryProps) => {
    // Data
    const { backings, collateralSymbol, debtSymbol } = props;

    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const green2 = useColorModeValue("green.light.2", "green.dark.2");
    const green12 = useColorModeValue("green.light.12", "green.dark.12");

    return (
        <Accordion
            allowToggle
            data-testid="BackingCardHistory"
            width="100%"
            margin="0 !important"
        >
            <AccordionItem border="0">
                {({ isExpanded }: { isExpanded: boolean }) => (
                    <>
                        <h2>
                            <AccordionButton
                                background={green2}
                                color={green12}
                                padding="4"
                                borderBottomLeftRadius={
                                    isExpanded ? "none" : "lg"
                                }
                                borderBottomRightRadius={
                                    isExpanded ? "none" : "lg"
                                }
                                _hover={{ background: green2 }}
                                data-testid="BackingCardHistoryButton"
                            >
                                <HStack gap={2}>
                                    <CheckmarkIcon w="4" h="4" />
                                    <Text
                                        color={green12}
                                        fontSize="sm"
                                        lineHeight="4"
                                        fontWeight="semibold"
                                        margin="0 !important"
                                    >
                                        {isExpanded ? "Hide" : "Show"} last 14
                                        days backing history
                                    </Text>
                                </HStack>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel padding="0">
                            <Flex
                                width="100%"
                                alignItems="flex-start"
                                paddingX="2"
                                margin="0 !important"
                                data-testid="BackingCardTable"
                                paddingY="4"
                            >
                                <VStack
                                    flex="1"
                                    alignItems="flex-start"
                                    width="100%"
                                    gap={4}
                                >
                                    <HStack
                                        background={gray3}
                                        width="100%"
                                        borderTopLeftRadius="lg"
                                        borderBottomLeftRadius="lg"
                                    >
                                        <Text
                                            padding="2"
                                            fontSize="xs"
                                            lineHeight="4"
                                            color={gray10}
                                        >
                                            Date
                                        </Text>
                                        <InfoTooltip
                                            info={`Date in UTC`}
                                            color={gray10}
                                        />
                                    </HStack>
                                    <VStack
                                        divider={
                                            <StackDivider
                                                borderColor={gray5}
                                                borderStyle="dashed"
                                                margin="0 !important"
                                            />
                                        }
                                        margin="0 !important"
                                        gap={4}
                                        width="100%"
                                        alignItems="flex-start"
                                    >
                                        {backings.map((backing) => (
                                            <Text
                                                color={gray12}
                                                fontSize="sm"
                                                lineHeight="4"
                                                fontFamily="mono"
                                                fontWeight="semibold"
                                                paddingX="2"
                                                margin="0 !important"
                                                letterSpacing="tight"
                                                key={backing.timestamp}
                                                data-testid="BackingCardHistoryDate"
                                            >
                                                {formatDate(
                                                    backing.timestamp * 1000
                                                )}
                                            </Text>
                                        ))}
                                    </VStack>
                                </VStack>
                                <VStack alignItems="flex-start" gap={4}>
                                    <Text
                                        padding="2"
                                        background={gray3}
                                        width="100%"
                                        fontSize="xs"
                                        lineHeight="4"
                                        color={gray10}
                                    >
                                        {collateralSymbol} amount
                                    </Text>
                                    <VStack
                                        divider={
                                            <StackDivider
                                                borderColor={gray5}
                                                borderStyle="dashed"
                                                margin="0 !important"
                                            />
                                        }
                                        margin="0 !important"
                                        gap={4}
                                        width="100%"
                                        alignItems="flex-end"
                                    >
                                        {backings.map((backing) => (
                                            <Text
                                                color={gray12}
                                                fontSize="sm"
                                                lineHeight="4"
                                                fontFamily="mono"
                                                fontWeight="semibold"
                                                paddingX="2"
                                                margin="0 !important"
                                                letterSpacing="tight"
                                                key={backing.timestamp}
                                                data-testid="BackingCardHistoryCollateralAmount"
                                            >
                                                +
                                                {formatTokenBalance(
                                                    parseFloat(
                                                        backing.collateralPerShare
                                                    )
                                                )}
                                            </Text>
                                        ))}
                                    </VStack>
                                </VStack>
                                <VStack
                                    alignItems="flex-end"
                                    gap={4}
                                    minW="100px"
                                >
                                    <Text
                                        padding="2"
                                        background={gray3}
                                        borderTopRightRadius="lg"
                                        borderBottomRightRadius="lg"
                                        fontSize="xs"
                                        lineHeight="4"
                                        color={gray10}
                                        width="100%"
                                        textAlign="right"
                                    >
                                        {debtSymbol} amount
                                    </Text>
                                    <VStack
                                        divider={
                                            <StackDivider
                                                borderColor={gray5}
                                                borderStyle="dashed"
                                                margin="0 !important"
                                            />
                                        }
                                        margin="0 !important"
                                        gap={4}
                                        width="100%"
                                        alignItems="flex-end"
                                    >
                                        {backings.map((backing) => (
                                            <Text
                                                color={gray12}
                                                fontSize="sm"
                                                lineHeight="4"
                                                fontFamily="mono"
                                                fontWeight="semibold"
                                                paddingX="2"
                                                margin="0 !important"
                                                letterSpacing="tight"
                                                key={backing.timestamp}
                                                data-testid="BackingCardHistoryDebtAmount"
                                            >
                                                -
                                                {formatTokenBalance(
                                                    parseFloat(
                                                        backing.debtPerShare
                                                    )
                                                )}
                                            </Text>
                                        ))}
                                    </VStack>
                                </VStack>
                            </Flex>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
};

export default BackingCardHistory;
