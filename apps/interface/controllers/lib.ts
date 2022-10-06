import { Env } from "@/env";

export interface Controller {
    (req: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
}
