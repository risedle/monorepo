import React from "react";
import { renderToReadableStream } from "react-dom/server";

import { Env } from "@/env";
import Layout from "@/app/layout";

// TODO: implement cache here
const GetHomePage = async (
    req: Request,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> => {
    const element = React.createElement(Layout);
    const stream = await renderToReadableStream(element);
    return new Response(stream);
};

export default GetHomePage;
