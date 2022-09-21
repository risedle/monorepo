import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import "../utils/window.ResizeObserver.mock.ts";
import TokenCards from "@/components/TokenCard/cards";

describe("<TokenCards />", () => {
    it("should render n number of <TokenCard />", () => {
        render(
            <TokenCards
                tokens={[
                    {
                        name: "ok",
                        symbol: "ok1",
                        address: "ok1",
                        prices: [
                            { timestamp: 1, price: 1 },
                            { timestamp: 2, price: 2 },
                        ],
                    },
                    {
                        name: "ok",
                        symbol: "ok2",
                        address: "ok2",
                        prices: [
                            { timestamp: 1, price: 1 },
                            { timestamp: 2, price: 2 },
                        ],
                    },
                ]}
            />
        );

        const tokenCards = screen.queryByTestId("TokenCards");
        expect(tokenCards).toBeInTheDocument();
        const tokenCard = screen.queryAllByTestId("TokenCard");
        expect(tokenCard.length).toBe(2);
    });
});
