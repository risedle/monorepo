import { ChainId } from "@risedle/types";

import service from "../../src/services/flt";

describe("getFuseLeveragedTokenUserPositionById", () => {
    describe("given random chainId", () => {
        it("should throw an error", async () => {
            expect.assertions(1);
            try {
                await service.GetFuseLeveragedTokenUserPositionById(
                    1234,
                    "AAA"
                );
            } catch (e) {
                expect(e).toBe("Endpoint not defined for chainId 1234");
            }
        });
    });

    describe("given BSC as chainId", () => {
        describe("given random positionId", () => {
            it("should return undefined", async () => {
                const position =
                    await service.GetFuseLeveragedTokenUserPositionById(
                        56,
                        "AAA"
                    );
                expect(position).toBeUndefined();
            });
        });

        describe("given correct positionId", () => {
            it("should return FuseLeveragedTokenUserPosition", async () => {
                const position =
                    await service.GetFuseLeveragedTokenUserPositionById(
                        56,
                        "0x1418be4753a22b69b613fa8b8144d856c023d46b-0x4f7255178b8f15c2cbe92d09b8a77b53ef4ec9ea"
                    );
                expect(position).toBeDefined();

                // Make sure it returns FuseLeveragedTokenPosition
                expect(position?.balance).toBeGreaterThan(5);
                expect(position?.usd).toBeGreaterThan(10);
                expect(typeof position?.pnlUSD).toBe("number");
                expect(position?.pnlPercent).toBeLessThanOrEqual(100);
                expect(position?.pnlPercent).toBeGreaterThanOrEqual(-100);
            });
        });
    });
});
