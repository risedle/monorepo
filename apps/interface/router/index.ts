/**
 * Router maps HTTP request to the controller
 */
import type { Env } from "@/env";
import type { Controller } from "@/controller";
// import GetHomePage from "@/controller/home";

// get("/", GetHomePage);
// get("/robots.txt", controller.GetRobotsText);
// get("/assets/*", controller.GetStaticAssets);
// use(controller.GetNotFoundPage);

interface ControllerInfo {
    method: "GET" | "POST";
    handle: Controller;
}
const ControllerMap = new Map<URLPattern, ControllerInfo>();
const get = (pattern: string, controller: Controller) => {
    const compiledPattern = new URLPattern(pattern);
    ControllerMap.set(compiledPattern, { method: "GET", handle: controller });
};

const router = async (
    req: Request,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> => {
    for (const [route, info] of ControllerMap) {
        const result = route.exec(req.url);
        if (result && req.method == info.method) {
            return await info.handle(req, env, ctx);
        }
    }
    return new Response("Controller not found", { status: 404 });
};

export default router;
