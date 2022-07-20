import { Container, Flex, Center, Spacer, Show } from "@chakra-ui/react";

import { NavigationBarLogo } from "./logo";
import { NavigationBarLinks } from "./links";
import { NavigationBarChainSwitcher } from "./chain";

export const NavigationBar = () => {
    return (
        <Container maxW="7xl" py="3" data-testid="NavigationBar">
            <Flex>
                <Center>
                    <NavigationBarLogo />
                </Center>
                {/* Center links on mobile */}
                <Center flex={{ base: "1", md: "0" }}>
                    <NavigationBarLinks />
                </Center>
                <Show above="md">
                    <Spacer />
                    <NavigationBarChainSwitcher />
                </Show>
            </Flex>
        </Container>
    );
};

export default NavigationBar;
