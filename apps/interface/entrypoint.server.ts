import { Env } from "@/env";

import router from "@/router";

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        return await router(request, env, ctx);
    },
};
