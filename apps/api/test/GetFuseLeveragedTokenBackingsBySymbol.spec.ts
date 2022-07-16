import request from "supertest";
import server from "../src/server";
import fltService from "../src/services/flts";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("GET /v1/chainId/flts/symbol/backings", () => {
    describe("given unsupported chainId", () => {
        it("should responds 404 not found", async () => {
            const res = await request(server)
                .get("/v1/4321/flts/ethrise/backings")
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
                    "getFuseLeveragedTokenBackingsBySymbol"
                );
                mock.mockImplementation(() => {
                    throw new Error("some error");
                });
                const res = await request(server)
                    .get("/v1/56/flts/bnbrise/backings")
                    .set("Accept", "application/json");
                expect(res.status).toBe(500);
            });
        });

        describe("given random symbol", () => {
            it("should responds 404 not found", async () => {
                const res = await request(server)
                    .get("/v1/56/flts/hohoho/backings")
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
                    .get("/v1/56/flts/bnbrise/backings")
                    .set("Accept", "application/json");
                expect(res.status).toBe(200);

                // Check price
                const backings = res.body.backings;
                expect(backings.length).toBeGreaterThan(1);
                expect(backings[0].timestamp).toBeGreaterThan(10000);
                expect(typeof backings[0].collateralPerShare).toBe("number");
                expect(typeof backings[0].debtPerShare).toBe("number");
                expect(typeof backings[0].valueUSD).toBe("number");
            });
        });
    });
});
