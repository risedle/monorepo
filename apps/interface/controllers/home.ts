import React from "react";
import ReactDOMServer from "react-dom/server";

import { Env } from "@/env";
import Layout from "@/app/layout";

/**
 * HomeController compose services call then return HTTP response
 */
const HomeController = async (
    req: Request,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> => {
    const props = {
        title: "Risedle - Simple Cross-chain DeFi for everyone",
    };
    const element = React.createElement(Layout, props);
    console.log("DEBUG: ReactDOMServer", ReactDOMServer);
    const stream = await ReactDOMServer.renderToReadableStream(element);
    return new Response(stream);
};

export default HomeController;
