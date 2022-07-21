import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import "../utils/window.ResizeObserver.mock.ts";
import { TokenCards } from "../../components/TokenCard/cards";

describe("<TokenCards />", () => {
    it("should render n number of <TokenCard />", () => {
        render(
            <TokenCards
                tokens={[
                    { name: "ok", symbol: "ok1", address: "ok1", prices: [] },
                    { name: "ok", symbol: "ok2", address: "ok2", prices: [] },
                ]}
            />
        );

        const tokenCards = screen.queryByTestId("TokenCards");
        expect(tokenCards).toBeInTheDocument();
        const tokenCard = screen.queryAllByTestId("TokenCard");
        expect(tokenCard.length).toBe(2);
    });
});
