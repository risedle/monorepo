import { Container, SimpleGrid } from "@chakra-ui/react";

import type { FuseLeveragedTokens } from "@/utils/types";
import { TokenCard } from "./index";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TokenCardsProps extends FuseLeveragedTokens {}

const TokenCards = (props: TokenCardsProps) => {
    // Data
    const { tokens } = props;
    const cards = tokens.map((token) => (
        <TokenCard {...token} key={token.address} />
    ));

    return (
        <Container maxW="5xl" py="3" data-testid="TokenCards">
            <SimpleGrid
                columns={{ base: 1, tablet: 2 }}
                spacing="6"
                margin="auto"
                marginBottom={{ base: "28", tablet: "0" }}
            >
                {cards}
            </SimpleGrid>
        </Container>
    );
};

export default TokenCards;
