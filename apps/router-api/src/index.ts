export async function handleRequest(request: Request, env: Bindings) {
    const data = {
        version: "xxx",
    };
    const json = JSON.stringify(data, null, 2);

    const response = new Response(json, {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    });
    return response;
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

export default worker;
