import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import BackingCardHistory from "../../components/BackingCard/History";

beforeEach(() => {
    window.scrollTo = jest.fn();
});

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<BackingCardHistory />", () => {
    it("should render backings table correctly", () => {
        render(
            <BackingCardHistory
                backings={[
                    {
                        timestamp: 12,
                        collateralPerShare: 1,
                        debtPerShare: 1,
                    },
                    {
                        timestamp: 13,
                        collateralPerShare: 1,
                        debtPerShare: 1,
                    },
                ]}
            />
        );

        const dates = screen.queryAllByTestId("BackingCardHistoryDate");
        expect(dates.length).toBe(2);
        const cas = screen.queryAllByTestId(
            "BackingCardHistoryCollateralAmount"
        );
        expect(cas.length).toBe(2);
        const das = screen.queryAllByTestId("BackingCardHistoryDebtAmount");
        expect(das.length).toBe(2);
    });

    it("should render table if button is clicked", async () => {
        render(
            <BackingCardHistory
                backings={[
                    {
                        timestamp: 12,
                        collateralPerShare: 1,
                        debtPerShare: 1,
                    },
                    {
                        timestamp: 13,
                        collateralPerShare: 1,
                        debtPerShare: 1,
                    },
                ]}
            />
        );

        const button = screen.queryByTestId("BackingCardHistoryButton");
        fireEvent.click(button);

        await waitFor(() => {
            const table = screen.queryByTestId("BackingCardTable");
            expect(table).toBeVisible();
        });
    });
});
