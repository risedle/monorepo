import { useState } from "react";
import { useColorModeValue, VStack, Text, Link } from "@chakra-ui/react";

interface FuseLeveragedTokenInfoCardDescriptionProps {
    symbol: string;
    name: string;
}

export const FuseLeveragedTokenInfoCardDescription = (
    props: FuseLeveragedTokenInfoCardDescriptionProps
) => {
    const [showMore, setShowMore] = useState(false);
    const { symbol, name } = props;

    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    return (
        <VStack margin="0 !important" paddingX="4" gap={6}>
            <Text color={gray10} fontSize="sm" lineHeight="6">
                {symbol} ({name}) is a derivatives product with no margin or
                liquidation risks. It provides you with leveraged exposure to
                the underlying asset, which may amplify profitability and
                potential losses.{" "}
                <Link
                    onClick={() => setShowMore(true)}
                    as="button"
                    color={gray12}
                    display={showMore ? "none" : "inline"}
                >
                    Show more...
                </Link>
            </Text>
            <Text
                color={gray10}
                fontSize="sm"
                lineHeight="6"
                margin="0 !important"
                display={showMore ? "block" : "none"}
            >
                Due to the rebalancing mechanism, the {symbol} are more
                suitable for short-term investment in a one-sided market. In a
                volatile market, the actual leverage may frequently exceed the
                target leverage range. This means that the rebalancing
                mechanism will be triggered accordingly in order to maintain
                leverage within the target range. Thus, {symbol} are not
                suitable for long-term investments.{" "}
                <Link
                    onClick={() => setShowMore(false)}
                    as="button"
                    color={gray12}
                >
                    Show less
                </Link>
            </Text>
        </VStack>
    );
};

export default FuseLeveragedTokenInfoCardDescription;
