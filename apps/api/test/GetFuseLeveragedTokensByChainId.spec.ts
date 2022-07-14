import request from "supertest";
import server from "../src/server";

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
            expect(firstToken.dailyPriceChangePercentage).toBeTruthy();
            expect(firstToken.totalVolumeUSD).toBeGreaterThan(0);
            expect(firstToken.dailyVolumeChangeUSD).toBeTruthy();
            expect(firstToken.dailyVolumeChangePercentage).toBeTruthy();
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
