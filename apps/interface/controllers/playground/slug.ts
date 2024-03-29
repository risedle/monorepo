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

import type { Env } from "~/env";
import type { RequestParams } from "~/controllers/lib";
import { notfound } from "~/controllers/lib";
import type { TemplateProps } from "~/templates/playground/slug";
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
    const props = await env.__STATIC_CONTENT.get<TemplateProps>(
        `playground/${slug}.json`,
        {
            type: "json",
            cacheTtl: 86400,
        }
    );
    if (!props) return notfound("Component not found");

    const element = React.createElement(Template, props);
    const stream = await ReactDOMServer.renderToReadableStream(element);
    return new Response(stream);
}
