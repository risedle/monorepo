// Implement footer bar
import {
    Container,
    Flex,
    Box,
    Spacer,
    Link,
    HStack,
    Text,
    useColorModeValue,
    Icon,
    IconProps,
    Center,
} from "@chakra-ui/react";
import NextLink from "next/link";

const GitbookIcon = (props: IconProps) => {
    return (
        <Icon viewBox="0 0 15 15" {...props}>
            <path
                d="M6.75015 11.6113C6.98453 11.6113 7.19547 11.7988 7.19547 12.0566C7.19547 12.291 7.00797 12.5019 6.75015 12.5019C6.51578 12.5019 6.30484 12.3144 6.30484 12.0566C6.30484 11.7988 6.51578 11.6113 6.75015 11.6113ZM13.6408 8.89254C13.4064 8.89254 13.1955 8.70504 13.1955 8.44723C13.1955 8.21285 13.383 8.00192 13.6408 8.00192C13.8752 8.00192 14.0861 8.18942 14.0861 8.44723C14.0861 8.6816 13.8752 8.89254 13.6408 8.89254ZM13.6408 7.08785C12.8908 7.08785 12.2814 7.69723 12.2814 8.44723C12.2814 8.58785 12.3048 8.72848 12.3517 8.8691L7.87515 11.2597C7.61734 10.8847 7.19547 10.6738 6.75015 10.6738C6.23453 10.6738 5.76578 10.9785 5.5314 11.4238L1.50015 9.31442C1.07828 9.08004 0.750155 8.40035 0.79703 7.7441C0.820467 7.41598 0.937655 7.15817 1.10172 7.06442C1.2189 6.9941 1.33609 7.01754 1.50015 7.08785L1.52359 7.11129C2.60172 7.67379 6.0939 9.50192 6.23453 9.57223C6.4689 9.66598 6.58609 9.71285 6.98453 9.52535L14.2033 5.77535C14.3205 5.72848 14.4377 5.63473 14.4377 5.47067C14.4377 5.25973 14.2267 5.16598 14.2267 5.16598C13.8048 4.97848 13.172 4.67379 12.5627 4.39254C11.2502 3.78317 9.75015 3.08004 9.0939 2.72848C8.5314 2.42379 8.06265 2.6816 7.99234 2.72848L7.82828 2.79879C4.85172 4.29879 0.914217 6.2441 0.679842 6.38473C0.281405 6.6191 0.0235924 7.11129 0.000154896 7.72067C-0.0467201 8.6816 0.445467 9.68942 1.14859 10.041L5.41422 12.2441C5.50797 12.9004 6.0939 13.416 6.75015 13.416C7.50015 13.416 8.08609 12.83 8.10953 12.08L12.797 9.54879C13.0314 9.73629 13.3361 9.83004 13.6408 9.83004C14.3908 9.83004 15.0002 9.22067 15.0002 8.47067C15.0002 7.69723 14.3908 7.08785 13.6408 7.08785Z"
                fill="currentColor"
            />
        </Icon>
    );
};

const ArrowTopRightIcon = (props: IconProps) => {
    return (
        <Icon viewBox="0 0 15 15" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                fill="currentColor"
            />
        </Icon>
    );
};

export const FooterBar = () => {
    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <Container maxW="7xl" data-testid="FooterBar" marginTop="10">
            <Flex
                borderTop="1px"
                borderColor={gray3}
                py="4"
                direction={{ base: "column", tablet: "row" }}
                gap={{ base: "2", tablet: "0" }}
            >
                <HStack margin={{ base: "auto", tablet: "0" }}>
                    <NextLink href="https://risedle.com" passHref>
                        <Link
                            fontSize="sm"
                            lineHeight="4"
                            color={gray10}
                            _hover={{ color: gray12 }}
                            data-testid="FooterBarLinkLabs"
                        >
                            Risedle Labs
                        </Link>
                    </NextLink>
                    <Text color={gray10}>&bull;</Text>
                    <NextLink href="https://docs.risedle.com" passHref>
                        <Link
                            fontSize="sm"
                            lineHeight="4"
                            color={gray12}
                            _hover={{ color: gray12 }}
                            target="_blank"
                            data-testid="FooterBarLinkDocs"
                        >
                            <Center>
                                <GitbookIcon w="4" h="4" marginRight="2" />
                                Docs
                                <ArrowTopRightIcon
                                    w="4"
                                    h="4"
                                    color={gray10}
                                />
                            </Center>
                        </Link>
                    </NextLink>
                </HStack>
                <Spacer />
                <HStack spacing="2" margin={{ base: "auto", tablet: "0" }}>
                    <NextLink href="https://twitter.com/risedle" passHref>
                        <Link
                            fontSize="sm"
                            lineHeight="4"
                            color={gray12}
                            _hover={{ color: gray12 }}
                            target="_blank"
                            data-testid="FooterBarLinkTwitter"
                        >
                            <Center>
                                Twitter
                                <ArrowTopRightIcon
                                    w="4"
                                    h="4"
                                    color={gray10}
                                />
                            </Center>
                        </Link>
                    </NextLink>
                    <NextLink
                        href="https://discord.com/invite/YCSCd97SXj"
                        passHref
                    >
                        <Link
                            fontSize="sm"
                            lineHeight="4"
                            color={gray12}
                            _hover={{ color: gray12 }}
                            target="_blank"
                            data-testid="FooterBarLinkDiscord"
                        >
                            <Center>
                                Discord
                                <ArrowTopRightIcon
                                    w="4"
                                    h="4"
                                    color={gray10}
                                />
                            </Center>
                        </Link>
                    </NextLink>
                    <NextLink href="https://github.com/risedle" passHref>
                        <Link
                            fontSize="sm"
                            lineHeight="4"
                            color={gray12}
                            _hover={{ color: gray12 }}
                            target="_blank"
                            data-testid="FooterBarLinkGithub"
                        >
                            <Center>
                                Github
                                <ArrowTopRightIcon
                                    w="4"
                                    h="4"
                                    color={gray10}
                                />
                            </Center>
                        </Link>
                    </NextLink>
                </HStack>
            </Flex>
        </Container>
    );
};
