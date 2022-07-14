import request from "supertest";
import server from "../src/server";

describe("GET /chainId/markets", () => {
    describe("given unsupported chainId", () => {
        it("should responds 404 not found", async () => {
            const res = await request(server)
                .get("/v1/4321/markets")
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
                .get("/v1/56/markets")
                .set("Accept", "application/json");
            expect(res.status).toBe(200);
            expect(res.body.markets.length).toBeGreaterThan(1);
        });
    });
});
