import { worker } from "@/index";

describe("Given Invalid Chain", () => {
    it("should respond 404 Not Found", async () => {
        const env = getMiniflareBindings();
        const res = await worker.fetch(
            new Request("http://localhost/v1/2000/dexs"),
            env
        );
        expect(res.status).toBe(404);
        expect(await res.json()).toEqual({
            message: "Chain not supported",
        });
    });
});

describe("Given Mainnet", () => {
    it("should responds correct dexs", async () => {
        const env = getMiniflareBindings();
        const res = await worker.fetch(
            new Request("http://localhost/v1/1/dexs"),
            env
        );
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({
            chain: "Mainnet",
            dexs: [
                {
                    name: "Uniswap V2",
                },
                {
                    name: "Sushiswap",
                },
                {
                    name: "Curve V1",
                },
            ],
        });
    });
});

describe("Given Arbitrum", () => {
    it("should responds correct dexs", async () => {
        const env = getMiniflareBindings();
        const res = await worker.fetch(
            new Request("http://localhost/v1/42161/dexs"),
            env
        );
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({
            chain: "Arbitrum",
            dexs: [
                {
                    name: "Sushiswap",
                },
                {
                    name: "Curve V1",
                },
            ],
        });
    });
});
