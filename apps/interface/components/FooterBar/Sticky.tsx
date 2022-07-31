import {
    VStack,
    Container,
    Flex,
    Spacer,
    Link,
    HStack,
    Text,
    useColorModeValue,
    Center,
} from "@chakra-ui/react";
import NextLink from "next/link";

// Icons
import ArrowTopRightIcon from "@/components/Icons/ArrowTopRight";

export const StickyFooterBar = () => {
    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack
            data-testid="StickyFooterBar"
            margin="0 !important"
            width="100%"
            alignItems="center"
        >
            <HStack gap={2}>
                <NextLink href="https://docs.risedle.com" passHref>
                    <Link
                        fontSize="sm"
                        lineHeight="4"
                        color={gray10}
                        _hover={{ color: gray12 }}
                        target="_blank"
                        data-testid="FooterBarLinkDocs"
                    >
                        <Center>
                            Docs
                            <ArrowTopRightIcon
                                w="14px"
                                h="14px"
                                color={gray10}
                            />
                        </Center>
                    </Link>
                </NextLink>
                <NextLink href="https://twitter.com/risedle" passHref>
                    <Link
                        fontSize="sm"
                        lineHeight="4"
                        color={gray10}
                        _hover={{ color: gray12 }}
                        target="_blank"
                        data-testid="FooterBarLinkTwitter"
                    >
                        <Center>
                            Twitter
                            <ArrowTopRightIcon
                                w="14px"
                                h="14px"
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
                        color={gray10}
                        _hover={{ color: gray12 }}
                        target="_blank"
                        data-testid="FooterBarLinkDiscord"
                    >
                        <Center>
                            Discord
                            <ArrowTopRightIcon
                                w="14px"
                                h="14px"
                                color={gray10}
                            />
                        </Center>
                    </Link>
                </NextLink>
                <NextLink href="https://github.com/risedle" passHref>
                    <Link
                        fontSize="sm"
                        lineHeight="4"
                        color={gray10}
                        _hover={{ color: gray12 }}
                        target="_blank"
                        data-testid="FooterBarLinkGithub"
                    >
                        <Center>
                            Github
                            <ArrowTopRightIcon
                                w="14px"
                                h="14px"
                                color={gray10}
                            />
                        </Center>
                    </Link>
                </NextLink>
            </HStack>
            <Text fontSize="sm" lineHeight="4" color={gray10}>
                &copy; 2022 Risedle Labs
            </Text>
        </VStack>
    );
};

export default StickyFooterBar;
