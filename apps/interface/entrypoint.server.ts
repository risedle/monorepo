/*****************************************************************************
 * Cloufdlare Workers Entrypoint
 *
 * This is the entrypoint of Cloudflare Workers and it's based on ES Modules.
 *
 * Read more about Cloudflare Workers:
 * https://developers.cloudflare.com/workers/get-started/guide/
 ****************************************************************************/
import { Env } from "~/env";
import router from "~/router";

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        return await router(request, env, ctx);
    },
};
