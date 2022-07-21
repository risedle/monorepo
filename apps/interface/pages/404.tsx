import {
    Button,
    Container,
    Flex,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";

export default function Custom404() {
    const gradient = useColorModeValue(
        `radial-gradient(
        91.36% 358.74% at 12.29% 100%,
        #9d85ff 0%,
        #7ad4f0 30.08%,
        #f554e5 60.28%,
        #e7cf55 100%
    );`,
        `radial-gradient(
        91.36% 358.74% at 12.29% 100%,
        #c9bbff 0%,
        #b2ecff 30.08%,
        #ffc1f9 60.28%,
        #fff5c1 100%
    );`
    );
    const textColor = useColorModeValue("gray.light.1", "gray.light.12");
    const gray1 = useColorModeValue("gray.light.1", "gray.dark.1");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    return (
        <Container
            maxW="7xl"
            py="3"
            data-testid="NavigationBar"
            minH="100vh"
            display="flex"
            flexDirection="column"
        >
            <NavigationBar />
            <Flex
                direction="column"
                grow={1}
                gap="64px"
                alignItems="center"
                justifyContent="center"
            >
                <VStack spacing="32px">
                    <VStack spacing="16px">
                        <Text
                            fontSize="12px"
                            lineHeight="16px"
                            align="center"
                            letterSpacing="widest"
                            color={gray10}
                            style={{ textTransform: "uppercase" }}
                        >
                            Page Not Found
                        </Text>
                        <Text
                            fontSize="96px"
                            lineHeight="92px"
                            fontWeight="bold"
                            align="center"
                            letterSpacing="-0.06em"
                            color={gray12}
                        >
                            404
                        </Text>
                    </VStack>
                    <Text
                        fontSize="16px"
                        lineHeight="24px"
                        align="center"
                        color={gray10}
                    >
                        Uh oh, seems the page you're searching is not there
                    </Text>
                </VStack>
                <a href="https://risedle.com/">
                    <Button
                        color={textColor}
                        paddingX="24px"
                        paddingY="12px"
                        backgroundImage={gradient}
                    >
                        <Text marginRight="8px">&larr;</Text>
                        Back to Landing Page
                    </Button>
                </a>
            </Flex>
        </Container>
    );
}
