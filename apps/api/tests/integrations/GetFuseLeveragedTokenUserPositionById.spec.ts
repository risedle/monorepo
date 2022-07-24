import request from "supertest";
import server from "../../src/server";
import service from "../../src/services/flt";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("GET /v1/chainId/positions/positionId", () => {
    describe("given unsupported chainId", () => {
        it("should responds 404 not found", async () => {
            const res = await request(server)
                .get("/v1/4321/positions/test")
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
                    "GetFuseLeveragedTokenUserPositionById"
                );
                mock.mockImplementation(() => {
                    throw new Error("some error");
                });
                const res = await request(server)
                    .get("/v1/56/positions/test")
                    .set("Accept", "application/json");
                expect(res.status).toBe(500);
            });
        });

        describe("given random positionId", () => {
            it("should responds 404 not found", async () => {
                const res = await request(server)
                    .get("/v1/56/positions/test")
                    .set("Accept", "application/json");
                expect(res.status).toBe(404);
                expect(res.body).toStrictEqual({
                    errors: [
                        {
                            location: "params",
                            msg: "positionId not found",
                            param: "positionId",
                            value: "test",
                        },
                    ],
                });
            });
        });

        describe("given correct positionId", () => {
            it("should responds 200 OK", async () => {
                const res = await request(server)
                    .get(
                        "/v1/56/positions/0x1418be4753a22b69b613fa8b8144d856c023d46b-0x4f7255178b8f15c2cbe92d09b8a77b53ef4ec9ea"
                    )
                    .set("Accept", "application/json");
                expect(res.status).toBe(200);

                // Check user position
                const position = res.body;
                expect(position.balance).toBeGreaterThan(5);
                expect(position.usd).toBeGreaterThan(10);
                expect(typeof position.pnlUSD).toBe("number");
                expect(position.pnlPercent).toBeLessThan(100);
                expect(position.pnlPercent).toBeGreaterThan(-100);
            });
        });
    });
});
