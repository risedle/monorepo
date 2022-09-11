import request from "supertest";
import server from "../../src/server";
import service from "../../src/services/flt";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("GET /v1/chainId/flts/symbol/charts", () => {
    describe("given unsupported chainId", () => {
        it("should responds 404 not found", async () => {
            const res = await request(server)
                .get("/v1/4321/flts/ethrise/charts")
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
                    service,
                    "GetFuseLeveragedTokenChartsBySymbol"
                );
                mock.mockImplementation(() => {
                    throw new Error("some error");
                });
                const res = await request(server)
                    .get("/v1/56/flts/bnbrise/charts")
                    .set("Accept", "application/json");
                expect(res.status).toBe(500);
            });
        });

        describe("given random symbol", () => {
            it("should responds 404 not found", async () => {
                const res = await request(server)
                    .get("/v1/56/flts/hohoho/charts")
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
                    .get("/v1/56/flts/bnbrise/charts")
                    .set("Accept", "application/json");
                expect(res.status).toBe(200);

                // Check price
                const prices = res.body.prices;
                expect(prices.length).toBeGreaterThan(24);
                // Make sure it returns OHLC format
                expect(prices[0].timestamp).toBeGreaterThan(10000);
                expect(typeof prices[0].open).toBe("number");
                expect(typeof prices[0].high).toBe("number");
                expect(typeof prices[0].low).toBe("number");
                expect(typeof prices[0].close).toBe("number");

                // Check volumes
                const volumes = res.body.volumes;
                expect(volumes.length).toBeGreaterThan(2);
                expect(volumes[0].timestamp).toBeGreaterThan(10000);
                expect(typeof volumes[0].usd).toBe("number");

                // Check fees
                const fees = res.body.fees;
                expect(fees.length).toBeGreaterThan(2);
                expect(fees[0].timestamp).toBeGreaterThan(10000);
                expect(typeof fees[0].usd).toBe("number");
            });
        });
    });
});
