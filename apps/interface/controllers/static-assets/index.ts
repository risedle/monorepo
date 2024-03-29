/*****************************************************************************
 * StaticAssetsController get static asset from Cloudflare KV
 ****************************************************************************/
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

import type { Env } from "~/env";
import type { RequestParams } from "~/controllers/lib";
import { notfound } from "~/controllers/lib";

const assetManifest = JSON.parse(manifestJSON);

export default async function controller(
    req: Request,
    params: RequestParams,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> {
    const staticReq = new Request(req.url.replace("/static", ""), req);
    const event = {
        request: staticReq,
        waitUntil: (promise: Promise<Response>) => {
            return ctx.waitUntil(promise);
        },
    };
    const options = {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
    };

    try {
        return await getAssetFromKV(event, options);
    } catch (e) {
        console.error("StaticAssetsController:", e);
        return notfound("Assets not found");
    }
}
