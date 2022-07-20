import { Container, Flex, Center, Spacer, HStack } from "@chakra-ui/react";

import { NavigationBarLogo } from "./logo";
import { NavigationBarLinks } from "./links";
import { NavigationBarChainSwitcher } from "./chain";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { DarkmodeToggle } from "../DarkmodeToggle";

export const NavigationBar = () => {
    return (
        <Container maxW="7xl" py="3" data-testid="NavigationBar">
            <Flex>
                <Center>
                    <NavigationBarLogo />
                </Center>
                {/* Center links on mobile */}
                <Center flex={{ base: "1", tablet: "0" }}>
                    <NavigationBarLinks />
                </Center>
                <Spacer display={{ base: "none", tablet: "block" }} />
                <HStack spacing={{ tablet: "2" }}>
                    <NavigationBarChainSwitcher
                        display={{ base: "none", tablet: "inline-flex" }}
                    />
                    <ConnectWalletButton
                        display={{ base: "none", tablet: "block" }}
                    />
                    <DarkmodeToggle />
                </HStack>
            </Flex>
        </Container>
    );
};

export default NavigationBar;
