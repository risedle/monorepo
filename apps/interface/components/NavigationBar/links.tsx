import { Center, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import ArrowTopRightIcon from "../Icons/ArrowTopRight";
import NavigationBarLink from "./link";

const NavigationBarLinks = () => {
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    return (
        <HStack
            data-testid="NavigationBarLinks"
            ml={{ laptop: "12" }}
            spacing="8"
        >
            <NavigationBarLink to="/" data-testid="NavigationBarLinksTrade">
                <Text fontWeight="normal" fontSize="sm" lineHeight="4">
                    Trade
                </Text>
            </NavigationBarLink>
            <NavigationBarLink
                to="https://app.midascapital.xyz/56/pool/6"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="NavigationBarLinksEarn"
            >
                <Center>
                    <Text fontWeight="normal" fontSize="sm" lineHeight="4">
                        Earn
                    </Text>
                    <ArrowTopRightIcon w="4" h="4" color={gray10} />
                </Center>
            </NavigationBarLink>
            <NavigationBarLink
                to="/portfolio"
                data-testid="NavigationBarLinksPortfolio"
            >
                <Text fontWeight="normal" fontSize="sm" lineHeight="4">
                    Portfolio
                </Text>
            </NavigationBarLink>
        </HStack>
    );
};

export default NavigationBarLinks;
