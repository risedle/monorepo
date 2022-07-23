import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Text,
    Icon,
    useColorModeValue,
    Box,
    Link,
    Spacer,
    Flex,
    Center,
    IconProps,
    ButtonProps,
    Circle,
    VStack,
    Divider,
} from "@chakra-ui/react";
import NextLink from "next/link";

import HamburgerIcon from "../Icons/Hamburger";
import CloseIcon from "../Icons/Close";
import ArrowTopRightIcon from "../Icons/ArrowTopRight";
import TwitterIcon from "../Icons/Twitter";
import DiscordIcon from "../Icons/Discord";
import GithubIcon from "../Icons/Github";
import GitbookIcon from "../Icons/Gitbook";
import GlobeIcon from "../Icons/Globe";

// TODO(pyk): highlight active navigation based on the route
const NavigationLinks = () => {
    const gray9 = useColorModeValue("gray.light.9", "gray.dark.9");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack width="100%" alignItems="flex-start" gap="4">
            <Text fontSize="xs" lineHeight="4" color={gray9}>
                Navigation
            </Text>
            <NextLink href="/" passHref>
                <Link
                    fontSize="sm"
                    lineHeight="4"
                    color={gray12}
                    _hover={{ color: gray12 }}
                    target="_blank"
                    data-testid="NavigationBarBottomLinksTrade"
                    margin="0 !important"
                >
                    Trade
                </Link>
            </NextLink>
            <NextLink href="/earn" passHref>
                <Link
                    fontSize="sm"
                    lineHeight="4"
                    color={gray12}
                    _hover={{ color: gray12 }}
                    target="_blank"
                    data-testid="NavigationBarBottomLinksEarn"
                    margin="0 !important"
                >
                    Earn
                </Link>
            </NextLink>
            <NextLink href="/portfolio" passHref>
                <Link
                    fontSize="sm"
                    lineHeight="4"
                    color={gray12}
                    _hover={{ color: gray12 }}
                    target="_blank"
                    data-testid="NavigationBarBottomLinksEarn"
                    margin="0 !important"
                >
                    Portfolio
                </Link>
            </NextLink>
        </VStack>
    );
};

const ConnectLinks = () => {
    const gray9 = useColorModeValue("gray.light.9", "gray.dark.9");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack width="100%" alignItems="flex-start" gap="4">
            <Text fontSize="xs" lineHeight="4" color={gray9}>
                Connect
            </Text>
            <Flex width="100%" margin="0 !important">
                <NextLink href="https://twitter.com/risedle" passHref>
                    <Link
                        fontSize="sm"
                        lineHeight="4"
                        color={gray12}
                        _hover={{ color: gray12 }}
                        target="_blank"
                        data-testid="NavigationBarBottomLinksTrade"
                    >
                        <Center>
                            Twitter
                            <ArrowTopRightIcon w="4" h="4" color={gray10} />
                        </Center>
                    </Link>
                </NextLink>
                <Spacer />
                <Center>
                    <TwitterIcon />
                </Center>
            </Flex>
            <Flex width="100%" margin="0 !important">
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
                        data-testid="NavigationBarBottomLinksTrade"
                    >
                        <Center>
                            Discord
                            <ArrowTopRightIcon w="4" h="4" color={gray10} />
                        </Center>
                    </Link>
                </NextLink>
                <Spacer />
                <Center>
                    <DiscordIcon />
                </Center>
            </Flex>
            <Flex width="100%" margin="0 !important">
                <NextLink href="https://github.com/risedle" passHref>
                    <Link
                        fontSize="sm"
                        lineHeight="4"
                        color={gray12}
                        _hover={{ color: gray12 }}
                        target="_blank"
                        data-testid="NavigationBarBottomLinksTrade"
                    >
                        <Center>
                            Github
                            <ArrowTopRightIcon w="4" h="4" color={gray10} />
                        </Center>
                    </Link>
                </NextLink>
                <Spacer />
                <Center>
                    <GithubIcon />
                </Center>
            </Flex>
        </VStack>
    );
};

const LearnMoreLinks = () => {
    const gray9 = useColorModeValue("gray.light.9", "gray.dark.9");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack width="100%" alignItems="flex-start" gap="4">
            <Text fontSize="xs" lineHeight="4" color={gray9}>
                Learn More
            </Text>
            <Flex width="100%" margin="0 !important">
                <NextLink href="https://docs.risedle.com" passHref>
                    <Link
                        fontSize="sm"
                        lineHeight="4"
                        color={gray12}
                        _hover={{ color: gray12 }}
                        target="_blank"
                        data-testid="LearnMoreLinkDocs"
                    >
                        <Center>
                            Docs
                            <ArrowTopRightIcon w="4" h="4" color={gray10} />
                        </Center>
                    </Link>
                </NextLink>
                <Spacer />
                <Center>
                    <GitbookIcon />
                </Center>
            </Flex>
            <Flex width="100%" margin="0 !important">
                <NextLink href="https://risedle.com" passHref>
                    <Link
                        fontSize="sm"
                        lineHeight="4"
                        color={gray12}
                        _hover={{ color: gray12 }}
                        target="_blank"
                        data-testid="LearnMoreLinkLabs"
                    >
                        <Center>
                            Risedle Labs
                            <ArrowTopRightIcon w="4" h="4" color={gray10} />
                        </Center>
                    </Link>
                </NextLink>
                <Spacer />
                <Center>
                    <GlobeIcon />
                </Center>
            </Flex>
        </VStack>
    );
};

export const NavigationBarBottomLinks = (props: ButtonProps) => {
    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray9 = useColorModeValue("gray.light.9", "gray.dark.9");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const blur = useColorModeValue("rgba(22,22,22,0.6)", "rgba(0,0,0,0.6)");

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    {/* Button */}
                    <MenuButton
                        as={Button}
                        data-testid="NavigationBarBottomLinks"
                        variant={{ base: "icon" }}
                        zIndex={isOpen ? 11 : 0}
                        {...props}
                    >
                        <Center>
                            <Circle>
                                {isOpen ? (
                                    <CloseIcon w="4" h="4" />
                                ) : (
                                    <HamburgerIcon w="4" h="4" />
                                )}
                            </Circle>
                        </Center>
                    </MenuButton>
                    {/* Popup */}
                    <MenuList
                        data-testid="NavigationBarBottomLinksPopup"
                        background={gray2}
                        borderColor={gray3}
                        borderWidth="1px"
                        borderRadius="lg"
                        minW="200px"
                        p="4"
                        boxShadow="none"
                        zIndex={isOpen ? 11 : 0}
                    >
                        {/* Navigation */}
                        <NavigationLinks />

                        <Divider
                            orientation="horizontal"
                            borderStyle="dashed"
                            borderColor={gray3}
                            marginY="2"
                        />

                        {/* Connect */}
                        <ConnectLinks />

                        <Divider
                            orientation="horizontal"
                            borderStyle="dashed"
                            borderColor={gray3}
                            marginY="2"
                        />

                        {/* LearnMore */}
                        <LearnMoreLinks />
                    </MenuList>
                    {/* Backdrop blur */}
                    <Box
                        data-testid="ChainSwitcherPopupBackground"
                        position="fixed"
                        width="100%"
                        height="100%"
                        left="0"
                        top="0"
                        background={blur}
                        backdropFilter="blur(12px)"
                        zIndex="10"
                        display={isOpen ? "block" : "none"}
                    />
                </>
            )}
        </Menu>
    );
};
