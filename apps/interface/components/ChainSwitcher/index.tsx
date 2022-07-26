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
} from "@chakra-ui/react";

import ChainIcon from "../Icons/Chain";
import { getBaseConfig } from "../../utils/getBaseConfig";

const ChevronDownIcon = (props: IconProps) => {
    return (
        <Icon viewBox="0 0 15 16" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.13523 6.65803C3.3241 6.45657 3.64052 6.44637 3.84197 6.63523L7.5 10.0646L11.158 6.63523C11.3595 6.44637 11.6759 6.45657 11.8648 6.65803C12.0536 6.85949 12.0434 7.17591 11.842 7.36477L7.84197 11.1148C7.64964 11.2951 7.35036 11.2951 7.15803 11.1148L3.15803 7.36477C2.95657 7.17591 2.94637 6.85949 3.13523 6.65803Z"
                fill="currentColor"
            />
        </Icon>
    );
};

export const ChainSwitcher = (props: ButtonProps) => {
    const { chainId, supportedChains, chainName } = getBaseConfig();

    // Styles
    const popupBackground = useColorModeValue("gray.light.2", "gray.dark.2");
    const popupBorder = useColorModeValue("gray.light.3", "gray.dark.3");
    const labelColor = useColorModeValue("gray.light.9", "gray.dark.9");
    const textColor = useColorModeValue("gray.light.12", "gray.dark.12");
    const blur = useColorModeValue("rgba(22,22,22,0.6)", "rgba(0,0,0,0.6)");

    // Dropdown selections
    const chains = supportedChains.filter((c) => c.chainId != chainId);
    const menuItems = chains.map((chain) => {
        return (
            <MenuItem
                as={Link}
                href={chain.baseURL}
                key={chain.chainId}
                color={textColor}
                borderRadius="lg"
                fontSize="sm"
                lineHeight="4"
                _hover={{ background: popupBorder, textDecoration: "none" }}
                p="2"
            >
                <Flex w="100%">
                    <Center w="100%">
                        <Text>{chain.chainName}</Text>
                        <Spacer />
                        <ChainIcon chainId={chain.chainId} w="4" h="4" />
                    </Center>
                </Flex>
            </MenuItem>
        );
    });

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    {/* Button */}
                    <MenuButton
                        as={Button}
                        // TODO(pyk): Update 'color' to specific chain
                        leftIcon={
                            <ChainIcon
                                color="bsc"
                                w="4"
                                h="4"
                                display={{ base: "none", tablet: "block" }}
                            />
                        }
                        rightIcon={
                            <ChevronDownIcon
                                w="4"
                                h="4"
                                display={{ base: "none", tablet: "block" }}
                            />
                        }
                        data-testid="ChainSwitcher"
                        margin={{ base: "0 !important", tablet: "auto" }}
                        variant={{ base: "icon" }}
                        paddingX={{ base: "0", tablet: "4" }}
                        zIndex={isOpen ? 11 : 0}
                        {...props}
                    >
                        <Center>
                            <Circle
                                display={{ base: "block", tablet: "none" }}
                            >
                                <ChainIcon color="bsc" w="4" h="4" />
                            </Circle>
                        </Center>
                        <Text
                            display={{ base: "none", tablet: "block" }}
                            margin={{
                                base: "0 !important",
                                tablet: "auto",
                            }}
                        >
                            {chainName}
                        </Text>
                    </MenuButton>
                    {/* Popup */}
                    <MenuList
                        data-testid="ChainSwitcherPopup"
                        background={popupBackground}
                        borderColor={popupBorder}
                        borderWidth="1px"
                        borderRadius="lg"
                        minW="200px"
                        p="2"
                        boxShadow="none"
                        zIndex={isOpen ? 11 : 0}
                    >
                        <Box p="2">
                            <Text
                                fontSize="xs"
                                lineHeight="4"
                                color={labelColor}
                            >
                                Select Chain
                            </Text>
                        </Box>
                        {menuItems}
                    </MenuList>
                    {/* Backdrop blur */}
                    <Box
                        data-testid="ChainSwitcherPopupBackground"
                        position="fixed"
                        width="100%"
                        height="100%"
                        left="0"
                        top="0"
                        margin="0 !important"
                        background={blur}
                        backdropFilter="blur(12px)"
                        zIndex="10"
                        display={{
                            base: isOpen ? "block" : "none",
                            tablet: "none",
                        }}
                    />
                </>
            )}
        </Menu>
    );
};
