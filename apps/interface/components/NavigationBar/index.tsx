import { Container, Flex, Center, Spacer, HStack } from "@chakra-ui/react";

import { NavigationBarLogo } from "./logo";
import { NavigationBarLinks } from "./links";
import { ChainSwitcher } from "../ChainSwitcher";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { DarkmodeToggle } from "../DarkmodeToggle";

export const NavigationBar = () => {
    return (
        <Container maxW="5xl" py="3" data-testid="NavigationBar">
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
                    <ChainSwitcher
                        display={{ base: "none", tablet: "flex" }}
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
