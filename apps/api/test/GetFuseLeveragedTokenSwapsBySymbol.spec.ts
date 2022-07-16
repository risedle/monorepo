import request from "supertest";
import server from "../src/server";
import fltService from "../src/services/flts";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("GET /v1/chainId/flts/symbol/swaps", () => {
    describe("given unsupported chainId", () => {
        it("should responds 404 not found", async () => {
            const res = await request(server)
                .get("/v1/4321/flts/ethrise/swaps")
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
                    fltService,
                    "getFuseLeveragedTokenSwapsBySymbol"
                );
                mock.mockImplementation(() => {
                    throw new Error("some error");
                });
                const res = await request(server)
                    .get("/v1/56/flts/bnbrise/swaps")
                    .set("Accept", "application/json");
                expect(res.status).toBe(500);
            });
        });

        describe("given random symbol", () => {
            it("should responds 404 not found", async () => {
                const res = await request(server)
                    .get("/v1/56/flts/hohoho/swaps")
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

        describe("given BNBRISE without userAddress", () => {
            it("should responds 200 OK", async () => {
                const res = await request(server)
                    .get("/v1/56/flts/bnbrise/swaps")
                    .set("Accept", "application/json");
                expect(res.status).toBe(200);

                // Check flt swaps
                const fltSwaps = res.body.flt;
                expect(fltSwaps.length).toBeGreaterThanOrEqual(1);

                // Make sure it returns Swap data
                expect(fltSwaps[0].timestamp).toBeGreaterThan(10000);
                expect(typeof fltSwaps[0].hash).toBe("string");
                expect(fltSwaps[0].hash.length).toBe(66);
                expect(typeof fltSwaps[0].user).toBe("string");
                expect(fltSwaps[0].user.length).toBe(42);
                expect(typeof fltSwaps[0].tokenIn.name).toBe("string");
                expect(typeof fltSwaps[0].tokenIn.symbol).toBe("string");
                expect(typeof fltSwaps[0].amountIn).toBe("number");
                expect(typeof fltSwaps[0].amountInUSD).toBe("number");
                expect(typeof fltSwaps[0].tokenOut.name).toBe("string");
                expect(typeof fltSwaps[0].tokenOut.symbol).toBe("string");
                expect(typeof fltSwaps[0].amountOut).toBe("number");
                expect(typeof fltSwaps[0].amountOutUSD).toBe("number");

                // Check user swaps
                const userSwaps = res.body.user;
                expect(userSwaps.length).toBe(0);
            });
        });

        describe("given BNBRISE with userAddress", () => {
            it("should responds 200 OK", async () => {
                const addy = "0x1418be4753a22b69b613fa8b8144d856c023d46b";
                const res = await request(server)
                    .get("/v1/56/flts/bnbrise/swaps?userAddress=" + addy)
                    .set("Accept", "application/json");
                expect(res.status).toBe(200);

                // Check flt swaps
                const fltSwaps = res.body.flt;
                expect(fltSwaps.length).toBeGreaterThanOrEqual(1);

                // Make sure it returns Swap data
                expect(fltSwaps[0].timestamp).toBeGreaterThan(10000);
                expect(typeof fltSwaps[0].hash).toBe("string");
                expect(fltSwaps[0].hash.length).toBe(66);
                expect(typeof fltSwaps[0].user).toBe("string");
                expect(fltSwaps[0].user.length).toBe(42);
                expect(typeof fltSwaps[0].tokenIn.name).toBe("string");
                expect(typeof fltSwaps[0].tokenIn.symbol).toBe("string");
                expect(typeof fltSwaps[0].amountIn).toBe("number");
                expect(typeof fltSwaps[0].amountInUSD).toBe("number");
                expect(typeof fltSwaps[0].tokenOut.name).toBe("string");
                expect(typeof fltSwaps[0].tokenOut.symbol).toBe("string");
                expect(typeof fltSwaps[0].amountOut).toBe("number");
                expect(typeof fltSwaps[0].amountOutUSD).toBe("number");

                // Check user swaps
                const userSwaps = res.body.user;
                expect(userSwaps.length).toBeGreaterThanOrEqual(1);

                // Make sure it returns Swap data
                expect(userSwaps[0].timestamp).toBeGreaterThan(10000);
                expect(typeof userSwaps[0].hash).toBe("string");
                expect(userSwaps[0].hash.length).toBe(66);
                expect(typeof userSwaps[0].user).toBe("string");
                expect(userSwaps[0].user.length).toBe(42);
                expect(userSwaps[0].user).toBe(addy);
                expect(typeof userSwaps[0].tokenIn.name).toBe("string");
                expect(typeof userSwaps[0].tokenIn.symbol).toBe("string");
                expect(typeof userSwaps[0].amountIn).toBe("number");
                expect(typeof userSwaps[0].amountInUSD).toBe("number");
                expect(typeof userSwaps[0].tokenOut.name).toBe("string");
                expect(typeof userSwaps[0].tokenOut.symbol).toBe("string");
                expect(typeof userSwaps[0].amountOut).toBe("number");
                expect(typeof userSwaps[0].amountOutUSD).toBe("number");
            });
        });
    });
});
