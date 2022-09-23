"client";

import { ChakraProvider, Container, Flex } from "@chakra-ui/react";

// TODO: add risedle exchange theme

const Header = () => (
    <ChakraProvider>
        <Container as="header" maxW="5xl" py="3">
            <nav>
                <ul>
                    <li>test</li>
                    <li>test</li>
                </ul>
            </nav>
        </Container>
    </ChakraProvider>
);

export default Header;
