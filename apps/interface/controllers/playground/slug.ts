/*****************************************************************************
 * Controller compose services call then return HTTP response
 *
 * This controller get the `slug` info from `/playground/:slug` url.
 *
 * Then fetch the JSON metadata from the Cloudflare KV.
 * The JSON metadata contains title, description and rendered HTML content
 * from `docs.mdx` for each component.
 ****************************************************************************/
import React from "react";
import ReactDOMServer from "react-dom/server";

import manifestJSON from "__STATIC_CONTENT_MANIFEST";

import type { Env } from "~/env";
import type { RequestParams } from "~/controllers/lib";
import { notfound } from "~/controllers/lib";
import Template from "~/templates/playground/slug";

export default async function controller(
    req: Request,
    params: RequestParams,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> {
    // Get the slug
    const slug = params.slug;

    // Fetch metadata from Cloudflare KV
    const props = await env.__STATIC_CONTENT.get(`playground/${slug}.json`, {
        type: "json",
    });
    console.log("DEBUG: props", props);
    if (!props) return notfound("Component not found");

    const element = React.createElement(Template, props);
    const stream = await ReactDOMServer.renderToReadableStream(element);
    return new Response(stream);
}
