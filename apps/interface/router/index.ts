/**
 * Router maps HTTP request to the controller
 */
import type { Env } from "@/env";
import type { Controller } from "@/controllers";

import { RouteRegistry, get } from "./lib";

/**
 * Controllers
 */
import HomeController from "@/controllers/home";

/**
 * Register controllers
 */
get("/", HomeController);

const router = async (
    req: Request,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> => {
    for (const [route, info] of RouteRegistry) {
        const result = route.exec(req.url);
        if (result && req.method == info.method) {
            return await info.handle(req, env, ctx);
        }
    }
    return new Response("Controller not found", { status: 404 });
};

export default router;
