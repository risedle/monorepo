import {
    Container,
    HStack,
    StackDivider,
    useColorModeValue,
    Box,
    Text,
    Center,
} from "@chakra-ui/react";

import { getBaseConfig } from "@/utils/getBaseConfig";
import ChainIcon from "../Icons/Chain";

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
            minW="max"
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
    // Optimistically generate 10 bars to prevent flashing on load coz it will
    // be pre-rendered (or html generated) when deployed
    const contentAmount = 10;

    const dividerColor = useColorModeValue(
        "warningBar.active.light",
        "warningBar.active.dark"
    );
    const borderBottomColor = useColorModeValue("gray.light.4", "gray.dark.4");
    const bg = useColorModeValue(
        "rgba(255,249,237,0.4)",
        "rgba(22,22,22,0.4)"
    );

    return (
        <Container
            maxW="full"
            centerContent
            data-testid="WarningBar"
            py="3"
            borderBottomWidth="1px"
            borderBottomColor={borderBottomColor}
            overflowX="hidden"
            background={bg}
            backdropFilter="blur(104px)"
        >
            <HStack
                divider={
                    <StackDivider borderColor={dividerColor} opacity="0.1" />
                }
                spacing="8"
            >
                {Array.from(Array(contentAmount), (e, i) => {
                    return <WarningBarContent key={i} />;
                })}
            </HStack>
        </Container>
    );
};
