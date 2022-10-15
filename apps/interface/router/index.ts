/**
 * Router maps HTTP request to the controller
 */
import type { Env } from "~/env";

import { RouteRegistry } from "./lib";
import "./registry";

export default async function router(
    req: Request,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> {
    for (const [route, info] of RouteRegistry) {
        const result = route.exec(req.url);
        if (result && req.method == info.method) {
            const params = result.pathname.groups;
            return await info.handle(req, params, env, ctx);
        }
    }
    return new Response("Controller not found", { status: 404 });
}
