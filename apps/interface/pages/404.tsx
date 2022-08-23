import {
    Button,
    Container,
    Flex,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import NavigationBar from "@/components/NavigationBar";

export default function Custom404() {
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
                        Uh oh, seems the page you&apos;re searching is not
                        there
                    </Text>
                </VStack>
                <NextLink href="/" passHref>
                    <Button
                        as="a"
                        variant="gradient"
                        data-testid="BackToHomeLink"
                    >
                        <Text marginRight="8px">&larr;</Text>
                        Back to Home
                    </Button>
                </NextLink>
            </Flex>
        </Container>
    );
}
