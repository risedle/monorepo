/**
 * Commonly used functions in controller implementation
 */
import type { Env } from "~/env";

export interface RequestParams {
    [key: string]: string;
}

export interface Controller {
    (
        req: Request,
        params: RequestParams,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response>;
}

/**
 * Return 404 response
 */
export function notfound(message: string): Response {
    return new Response(message, { status: 404 });
}
