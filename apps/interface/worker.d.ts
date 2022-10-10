/**
 * We need to copy-paste this file https://github.com/cloudflare/workers-types/blob/master/index.d.ts
 * manually coz of this issue:
 * https://github.com/cloudflare/workers-types/issues/164#issuecomment-1099621564
 */
declare module "__STATIC_CONTENT_MANIFEST" {
    const manifest: string;
    export default manifest;
}

declare class URLPattern {
    constructor(input?: string | URLPatternURLPatternInit, baseURL?: string);
    readonly protocol: string;
    readonly username: string;
    readonly password: string;
    readonly hostname: string;
    readonly port: string;
    readonly pathname: string;
    readonly search: string;
    readonly hash: string;
    test(input?: string | URLPatternURLPatternInit, baseURL?: string): boolean;
    exec(
        input?: string | URLPatternURLPatternInit,
        baseURL?: string
    ): URLPatternURLPatternResult | null;
}

interface URLPatternURLPatternComponentResult {
    input: string;
    groups: Record<string, string>;
}

interface URLPatternURLPatternInit {
    protocol?: string;
    username?: string;
    password?: string;
    hostname?: string;
    port?: string;
    pathname?: string;
    search?: string;
    hash?: string;
    baseURL?: string;
}

interface URLPatternURLPatternResult {
    inputs: (string | URLPatternURLPatternInit)[];
    protocol: URLPatternURLPatternComponentResult;
    username: URLPatternURLPatternComponentResult;
    password: URLPatternURLPatternComponentResult;
    hostname: URLPatternURLPatternComponentResult;
    port: URLPatternURLPatternComponentResult;
    pathname: URLPatternURLPatternComponentResult;
    search: URLPatternURLPatternComponentResult;
    hash: URLPatternURLPatternComponentResult;
}

interface ExecutionContext {
    waitUntil(promise: Promise<any>): void;
    passThroughOnException(): void;
}
