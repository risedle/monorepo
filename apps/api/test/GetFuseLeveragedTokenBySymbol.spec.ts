import request from "supertest";
import server from "../src/server";

describe("GET /v1/chainId/flts/symbol", () => {
    describe("given unsupported chainId", () => {
        it("should responds 404 not found", async () => {
            const res = await request(server)
                .get("/v1/4321/flts/ethrise")
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
        describe("given random symbol", () => {
            it("should responds 404 not found", async () => {
                const res = await request(server)
                    .get("/v1/56/flts/hohoho")
                    .set("Accept", "application/json");
                expect(res.status).toBe(404);
                expect(res.body).toStrictEqual({
                    errors: [
                        {
                            location: "params",
                            msg: "symbol not found",
                            param: "symbol",
                            value: "hohoho",
                        },
                    ],
                });
            });
        });

        describe("given BNBRISE", () => {
            it("should responds 200 OK", async () => {
                const res = await request(server)
                    .get("/v1/56/flts/bnbrise")
                    .set("Accept", "application/json");
                expect(res.status).toBe(200);

                const token = res.body;
                expect(token.name).toEqual("2X Long BNB Risedle");
                expect(token.symbol).toEqual("BNBRISE");
                expect(token.decimals).toEqual(18);
                expect(token.address).toEqual(
                    "0x4f7255178b8f15c2cbe92d09b8a77b53ef4ec9ea"
                );
                expect(token.priceUSD).toBeGreaterThan(1);
                expect(token.dailyPriceChangeUSD).toBeTruthy();
                expect(token.dailyPriceChangePercentage).toBeTruthy();
                expect(token.totalVolumeUSD).toBeGreaterThan(0);
                expect(token.dailyVolumeChangeUSD).toBeGreaterThanOrEqual(0);
                expect(
                    token.dailyVolumeChangePercentage
                ).toBeGreaterThanOrEqual(0);
                expect(token.marketcapUSD).toBeGreaterThan(0);
                expect(token.totalCollateral).toBeGreaterThan(0);
                expect(token.totalDebt).toBeGreaterThan(0);
                expect(token.collateral.name).toEqual("Wrapped BNB");
                expect(token.collateral.symbol).toEqual("WBNB");
                expect(token.collateral.amount).toBeGreaterThan(0);
                expect(token.debt.name).toEqual("BUSD Token");
                expect(token.debt.symbol).toEqual("BUSD");
                expect(token.debt.amount).toBeGreaterThan(0);
            });
        });
    });
});
