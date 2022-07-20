import {
    Container,
    HStack,
    StackDivider,
    useColorModeValue,
    Box,
    Text,
    Center,
} from "@chakra-ui/react";

import { getBaseConfig } from "../../utils/getBaseConfig";
// import { useViewportSize } from "../../hooks/useViewportSize";
import { ChainIcon } from "../ChainIcon";

const WarningBarContent = () => {
    const baseConfig = getBaseConfig();

    const activeColor = useColorModeValue(
        "warningBar.active.light",
        "warningBar.active.dark"
    );
    const baseColor = useColorModeValue(
        "warningBar.base.light",
        "warningBar.base.dark"
    );

    return (
        <HStack
            data-testid="WarningBarContent"
            divider={<StackDivider borderColor={activeColor} opacity="0.1" />}
            spacing="8"
        >
            <HStack>
                <Box minW="max">
                    <Text
                        fontSize="xs"
                        fontWeight="semibold"
                        color={activeColor}
                        lineHeight="4"
                        letterSpacing="tight"
                    >
                        {baseConfig.chainName}
                    </Text>
                </Box>
                <Box minW="max">
                    <Center>
                        <ChainIcon color={activeColor} />
                    </Center>
                </Box>
            </HStack>
            <HStack>
                <Box minW="max">
                    <Text
                        fontSize="xs"
                        fontWeight="semibold"
                        color={baseColor}
                        lineHeight="4"
                        letterSpacing="tight"
                    >
                        Alpha Release
                    </Text>
                </Box>
                <Box minW="max">
                    <Center>
                        <ChainIcon color={baseColor} />
                    </Center>
                </Box>
            </HStack>
        </HStack>
    );
};

export const WarningBar = () => {
    // Fill the current windown
    // const dim = useViewportSize();
    // const contentAmount = Math.round(dim.width / 375 + 1);

    // Optimistically generate 10 bars to prevent flashing on load
    const contentAmount = 10;

    const dividerColor = useColorModeValue(
        "warningBar.active.light",
        "warningBar.active.dark"
    );
    const borderBottomColor = useColorModeValue("gray.light.4", "gray.dark.4");

    return (
        <>
            <Container
                maxW="full"
                centerContent
                data-testid="WarningBar"
                py="3"
                borderBottomWidth="1px"
                borderBottomColor={borderBottomColor}
                overflowX="hidden"
            >
                <HStack
                    divider={
                        <StackDivider
                            borderColor={dividerColor}
                            opacity="0.1"
                        />
                    }
                    spacing="8"
                >
                    {Array.from(Array(contentAmount), (e, i) => {
                        return <WarningBarContent key={i} />;
                    })}
                </HStack>
            </Container>
        </>
    );
};
