import React from "react";
import ReactDOMServer from "react-dom/server";

import type { Env } from "~/env";
import type { RequestParams } from "~/controllers/lib";
import Template from "~/templates/playground";

export default async function controller(
    req: Request,
    params: RequestParams,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> {
    const props = {
        title: "Risedle Components Playground",
    };
    const element = React.createElement(Template, props);
    const stream = await ReactDOMServer.renderToReadableStream(element);
    return new Response(stream);
}
