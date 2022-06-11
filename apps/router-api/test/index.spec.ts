import { handleRequest } from "../src/index";

test("should return 200", async () => {
    const env = getMiniflareBindings();
    const res = await handleRequest(new Request("http://localhost"), env);
    expect(res.status).toBe(200);
});
