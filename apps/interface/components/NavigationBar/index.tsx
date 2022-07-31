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
                <Center flex={{ base: "1", laptop: "0" }}>
                    <NavigationBarLinks />
                </Center>
                <Spacer display={{ base: "none", laptop: "block" }} />
                <HStack spacing={{ laptop: "2" }}>
                    <ChainSwitcher
                        display={{ base: "none", laptop: "flex" }}
                    />
                    <ConnectWalletButton
                        display={{ base: "none", laptop: "block" }}
                    />
                    <DarkmodeToggle />
                </HStack>
            </Flex>
        </Container>
    );
};

export default NavigationBar;
