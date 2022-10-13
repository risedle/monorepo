/*****************************************************************************
 * Controller compose services call then return HTTP response
 ****************************************************************************/
import React from "react";
import ReactDOMServer from "react-dom/server";

import type { RequestParams } from "~/controllers/lib";
import { Env } from "~/env";
import Template from "~/templates/home";

export default async function controller(
    req: Request,
    params: RequestParams,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> {
    console.log("DEBUG: params", params);
    const props = {
        title: "Risedle - Simple Cross-chain DeFi for everyone",
    };
    const element = React.createElement(Template, props);
    const stream = await ReactDOMServer.renderToReadableStream(element);
    return new Response(stream);
}
