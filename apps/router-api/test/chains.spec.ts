// Test GET /v1/chains
// Make sure the API response as expected
import { worker } from "@/index";

it("should responds correct chains", async () => {
    const env = getMiniflareBindings();
    const res = await worker.fetch(
        new Request("http://localhost/v1/chains"),
        env
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
        chains: [1, 42161],
    });
});
