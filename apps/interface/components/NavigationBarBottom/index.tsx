import { Container, Flex, useColorModeValue } from "@chakra-ui/react";

import ChainSwitcher from "../ChainSwitcher";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { NavigationBarBottomLinks } from "./links";

export const NavigationBarBottom = () => {
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    return (
        <Container
            data-testid="NavigationBarBottom"
            maxW="full"
            centerContent
            py="3"
            display={{ laptop: "none" }}
            position="fixed"
            bottom="0"
            bg={gray2}
            borderTop="1px"
            borderColor={gray4}
        >
            <Flex width="100%" gap="2">
                <ChainSwitcher />
                <ConnectWalletButton flex="1" />
                <NavigationBarBottomLinks />
            </Flex>
        </Container>
    );
};
