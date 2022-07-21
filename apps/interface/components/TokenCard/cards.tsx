import { Container, SimpleGrid } from "@chakra-ui/react";

import type { FuseLeveragedTokens } from "../../utils/fetchFuseLeveragedTokens";
import { TokenCard } from "./index";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TokenCardsProps extends FuseLeveragedTokens {}

export const TokenCards = (props: TokenCardsProps) => {
    // Data
    const { tokens } = props;
    const cards = tokens.map((token) => (
        <TokenCard {...token} key={token.address} />
    ));

    return (
        <Container maxW="7xl" py="3" data-testid="TokenCards">
            <SimpleGrid
                columns={{ base: 1, laptop: 2, desktop: 3 }}
                spacing="6"
                margin="auto"
                maxW={{ base: "400px", laptop: "730px", desktop: "100%" }}
            >
                {cards}
            </SimpleGrid>
        </Container>
    );
};
