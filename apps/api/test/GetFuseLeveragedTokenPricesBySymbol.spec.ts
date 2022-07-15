import request from "supertest";
import server from "../src/server";

describe("GET /v1/chainId/flts/symbol/prices", () => {
    describe("given unsupported chainId", () => {
        it("should responds 404 not found", async () => {
            const res = await request(server)
                .get("/v1/4321/flts/ethrise/prices")
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
                    .get("/v1/56/flts/hohoho/prices")
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
                    .get("/v1/56/flts/bnbrise/prices")
                    .set("Accept", "application/json");
                expect(res.status).toBe(200);
                const prices = res.body.prices;
                expect(prices.length).toBeGreaterThan(24);
                // Make sure it returns OHLC format
                expect(prices[0].timestamp).toBeGreaterThan(10000);
                expect(typeof prices[0].open).toBe("number");
                expect(typeof prices[0].high).toBe("number");
                expect(typeof prices[0].low).toBe("number");
                expect(typeof prices[0].close).toBe("number");
            });
        });
    });
});
