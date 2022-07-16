import request from "supertest";
import server from "../src/server";

describe("GET /health", () => {
    it("should responds 200 OK", async () => {
        const res = await request(server)
            .get("/health")
            .set("Accept", "application/json");
        expect(res.status).toBe(200);
    });
});
