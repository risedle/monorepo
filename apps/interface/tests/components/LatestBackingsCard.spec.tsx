import { render, screen } from "@testing-library/react";

import LatestBackingsCard from "@/components/LatestBackingsCard";

describe("<LatestBackingsCard />", () => {
    it("should render backings table correctly", () => {
        render(
            <LatestBackingsCard
                flt={{
                    symbol: "TEST",
                    collateral: { symbol: "C" },
                    debt: { symbol: "D" },
                    backings: [
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
                    ],
                    minLeverageRatio: "1.2",
                    maxLeverageRatio: "2.4",
                }}
            />
        );

        const dates = screen.queryAllByTestId("LatestBackingsCardDate");
        expect(dates.length).toBe(2);
        const cas = screen.queryAllByTestId(
            "LatestBackingsCardCollateralAmount"
        );
        expect(cas.length).toBe(2);
        const das = screen.queryAllByTestId("LatestBackingsCardDebtAmount");
        expect(das.length).toBe(2);
    });
});
