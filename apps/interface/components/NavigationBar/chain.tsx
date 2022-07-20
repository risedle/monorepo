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
} from "@chakra-ui/react";

import { ChainIcon } from "../ChainIcon";
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

export const NavigationBarChainSwitcher = () => {
    const baseConfig = getBaseConfig();

    // Styles
    const popupBackground = useColorModeValue("gray.light.2", "gray.dark.2");
    const popupBorder = useColorModeValue("gray.light.3", "gray.dark.3");
    const labelColor = useColorModeValue("gray.light.9", "gray.dark.9");
    const textColor = useColorModeValue("gray.light.12", "gray.dark.12");

    // Dropdown selections
    const chains = baseConfig.supportedChains.filter(
        (c) => c.chainId != baseConfig.chainId
    );
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
            <MenuButton
                as={Button}
                // TODO(pyk): Update 'color' to specific chain
                leftIcon={<ChainIcon color="bsc" w="4" h="4" />}
                rightIcon={<ChevronDownIcon w="4" h="4" />}
                data-testid="NavigationBarChainSwitcher"
            >
                <Text>{baseConfig.chainName}</Text>
            </MenuButton>
            <MenuList
                data-testid="NavigationBarChainSwitcherPopup"
                background={popupBackground}
                borderColor={popupBorder}
                borderWidth="1px"
                borderRadius="lg"
                minW="161px"
                p="2"
            >
                <Box p="2">
                    <Text fontSize="xs" lineHeight="4" color={labelColor}>
                        Select Chain
                    </Text>
                </Box>
                {menuItems}
            </MenuList>
        </Menu>
    );
};
