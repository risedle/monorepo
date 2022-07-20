import {
    Container,
    Flex,
    Center,
    Spacer,
    Show,
    HStack,
    Hide,
} from "@chakra-ui/react";

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
                <Show above="tablet">
                    <Spacer />
                    <HStack spacing="2">
                        <NavigationBarChainSwitcher />
                        <ConnectWalletButton />
                        <DarkmodeToggle />
                    </HStack>
                </Show>
                <Hide above="tablet">
                    <DarkmodeToggle />
                </Hide>
            </Flex>
        </Container>
    );
};

export default NavigationBar;
