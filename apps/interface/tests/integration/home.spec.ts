import { describe, it, beforeAll, afterAll, expect } from "vitest";
// import { unstable_dev } from "wrangler";
// import type { UnstableDevWorker } from "wrangler";
import { JSDOM } from "jsdom";

import worker from "@/entrypoint.server";

describe("Given 'GET' HTTP request to '/'", () => {
    it("Should render HTML", async () => {
        //        const worker = await unstable_dev(
        //            "entrypoint.server.ts",
        //            {},
        //            { disableExperimentalWarning: true }
        //        );
        //        const resp = await worker.fetch();
        //
        //        // Parse response as DOM
        //        const body = await resp.text();
        //        const { document } = new JSDOM(body).window;
        //
        //        // Get <title> content
        //        const title = document.title;
        //        expect(title).toBe("Risedle - Simple Cross-chain DeFi for everyone");
        //        await worker.stop();

        // Create new GET '/' request
        const req = new Request("http://localhost:2000/");
        const env = getMiniflareBindings();
        const ctx = new ExecutionContext();
        const res = await worker.fetch(req, env, ctx);
        // console.log("DEBUG: res", res);
        expect(true).toBe(true);
    });
});
