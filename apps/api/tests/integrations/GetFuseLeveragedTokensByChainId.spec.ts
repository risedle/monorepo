import request from "supertest";
import server from "../../src/server";
import flt from "../../src/services/flt";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("GET /v1/chainId/flts", () => {
    describe("given unsupported chainId", () => {
        it("should responds 404 not found", async () => {
            const res = await request(server)
                .get("/v1/4321/flts")
                .set("Accept", "application/json");
            expect(res.status).toBe(404);
            expect(res.body).toStrictEqual({
                errors: [
                    {
                        location: "params",
                        msg: "chainId not supported",
                        param: "chainId",
                        value: 4321,
                    },
                ],
            });
        });
    });

    describe("given Binance Smart Chain", () => {
        describe("given failed request to graphql", () => {
            it("should responds 500 internal server error", async () => {
                const mock = jest.spyOn(
                    flt,
                    "GetFuseLeveragedTokensByChainId"
                );
                mock.mockImplementation(() => {
                    throw new Error("some error");
                });
                const res = await request(server)
                    .get("/v1/56/flts")
                    .set("Accept", "application/json");
                expect(res.status).toBe(500);
            });
        });

        describe("given success request to graphql", () => {
            it("should responds OK", async () => {
                const res = await request(server)
                    .get("/v1/56/flts")
                    .set("Accept", "application/json");
                expect(res.status).toBe(200);
                expect(res.body.tokens.length).toBeGreaterThan(1);

                const firstToken = res.body.tokens[0];
                expect(firstToken.name).toBeTruthy();
                expect(firstToken.symbol).toBeTruthy();
                expect(firstToken.decimals).toEqual(18);
                expect(firstToken.address).toBeTruthy();
                expect(firstToken.priceUSD).toBeGreaterThan(1);
                expect(firstToken.dailyPriceChangeUSD).toBeTruthy();
                expect(
                    firstToken.dailyPriceChangePercentage
                ).toBeLessThanOrEqual(100);
                expect(
                    firstToken.dailyPriceChangePercentage
                ).toBeGreaterThanOrEqual(-100);
                expect(firstToken.totalVolumeUSD).toBeGreaterThan(0);
                expect(typeof firstToken.dailyVolumeChangeUSD).toBe("number");
                expect(
                    firstToken.dailyVolumeChangePercentage
                ).toBeLessThanOrEqual(100);
                expect(
                    firstToken.dailyVolumeChangePercentage
                ).toBeGreaterThanOrEqual(-100);
                expect(firstToken.marketcapUSD).toBeGreaterThan(0);
                expect(firstToken.totalCollateral).toBeGreaterThan(0);
                expect(firstToken.totalDebt).toBeGreaterThan(0);
                expect(firstToken.collateral.name).toBeTruthy();
                expect(firstToken.collateral.symbol).toBeTruthy();
                expect(firstToken.collateral.amount).toBeTruthy();
                expect(firstToken.debt.name).toBeTruthy();
                expect(firstToken.debt.symbol).toBeTruthy();
                expect(firstToken.debt.amount).toBeTruthy();
            });
        });
    });
});
