import { useState } from "react";
import { useColorModeValue, VStack, Text, Link } from "@chakra-ui/react";

interface FuseLeveragedTokenInfoCardDescriptionProps {
    symbol: string;
    name: string;
}

const FuseLeveragedTokenInfoCardDescription = (
    props: FuseLeveragedTokenInfoCardDescriptionProps
) => {
    const [showMore, setShowMore] = useState(false);
    const { symbol, name } = props;

    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    return (
        <VStack margin="0 !important" paddingX="4" gap={6}>
            <Text
                data-testid="FLTInfoCardDescFirstParagraph"
                color={gray10}
                fontSize="sm"
                lineHeight="6"
            >
                {symbol} ({name}) is a derivatives product with no margin or
                liquidation risks. It provides you with leveraged exposure to
                the underlying asset, which may amplify profitability and
                potential losses.{" "}
                <Link
                    data-testid="FLTInfoCardShowMoreDescLink"
                    onClick={() => setShowMore(true)}
                    as="button"
                    display={showMore ? "none" : "inline"}
                >
                    <Text color={gray12} fontWeight="semibold">
                        Show more...
                    </Text>
                </Link>
            </Text>
            <Text
                data-testid="FLTInfoCardDescSecondParagraph"
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
                    data-testid="FLTInfoCardShowLessDescLink"
                    onClick={() => setShowMore(false)}
                    as="button"
                >
                    <Text color={gray12} fontWeight="semibold">
                        Show less
                    </Text>
                </Link>
            </Text>
        </VStack>
    );
};

export default FuseLeveragedTokenInfoCardDescription;
