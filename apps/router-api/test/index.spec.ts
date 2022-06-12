import { worker } from "@/index";

it("should responds 200 OK", async () => {
    const env = getMiniflareBindings();
    const res = await worker.fetch(new Request("http://localhost"), env);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "OK" });
});
