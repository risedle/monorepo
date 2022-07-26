import { HStack, Text } from "@chakra-ui/react";
import NavigationBarLink from "./link";

export const NavigationBarLinks = () => {
    return (
        <HStack data-testid="NavigationBarLinks" ml={{ md: "12" }} spacing="8">
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
                <Text fontWeight="normal" fontSize="sm" lineHeight="4">
                    Earn
                </Text>
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
