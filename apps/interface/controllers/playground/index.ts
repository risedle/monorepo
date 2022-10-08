import React from "react";
import ReactDOMServer from "react-dom/server";

import { Env } from "@/env";
import Template from "@/templates/playground";

/**
 * PlaygroundController compose services call then return HTTP response
 */
const PlaygroundController = async (
    req: Request,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> => {
    const props = {
        title: "Risedle Components Playground",
    };
    const element = React.createElement(Template, props);
    const stream = await ReactDOMServer.renderToReadableStream(element);
    return new Response(stream);
};

export default PlaygroundController;
