import {
    VStack,
    Link,
    Text,
    useColorModeValue,
    Center,
    Box,
    List,
    ListItem,
} from "@chakra-ui/react";
import NextLink from "next/link";

// Icons
import ArrowTopRightIcon from "@/components/Icons/ArrowTopRight";

const StickyFooterBar = () => {
    // Styles
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack
            as="footer"
            data-testid="StickyFooterBar"
            marginTop="4"
            gap="4"
            width="100%"
            alignItems="center"
            py="6"
        >
            <Box as="nav">
                <List display="flex" flexDirection="row" gap="6" as="ul">
                    <ListItem>
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
                    </ListItem>
                    <ListItem>
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
                    </ListItem>
                    <ListItem>
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
                    </ListItem>
                    <ListItem>
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
                    </ListItem>
                </List>
            </Box>
            <Text fontSize="sm" lineHeight="4" color={gray10}>
                &copy; 2022 Risedle Labs
            </Text>
        </VStack>
    );
};

export default StickyFooterBar;
