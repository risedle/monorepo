import request from "supertest";
import server from "../../src/server";
import service from "../../src/services/flt";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("GET /v1/chainId/flts/insight/gains", () => {
    describe("given unsupported chainId", () => {
        it("should responds 404 not found", async () => {
            const res = await request(server)
                .get("/v1/4321/flts/insight/gains")
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
                    "GetFuseLeveragedTokensGains"
                );
                mock.mockImplementation(() => {
                    throw new Error("some error");
                });
                const res = await request(server)
                    .get("/v1/56/flts/insight/gains")
                    .set("Accept", "application/json");
                expect(res.status).toBe(500);
            });
        });

        describe("given succesfull request to graphql", () => {
            it("should responds 200 OK", async () => {
                const res = await request(server)
                    .get("/v1/56/flts/insight/gains")
                    .set("Accept", "application/json");
                expect(res.status).toBe(200);

                // Check price
                const tokens = res.body.tokens;
                expect(tokens.length).toBeGreaterThan(1);
                expect(typeof tokens[0].symbol).toBe("string");
                expect(typeof tokens[0].name).toBe("string");
                expect(typeof tokens[0].dailyGain.gain).toBe("number");
                expect(typeof tokens[0].dailyGain.timestamp).toBe("number");
                expect(typeof tokens[0].weeklyGain.gain).toBe("number");
                expect(typeof tokens[0].weeklyGain.timestampStart).toBe(
                    "number"
                );
                expect(typeof tokens[0].weeklyGain.timestampEnd).toBe(
                    "number"
                );
            });
        });
    });
});
