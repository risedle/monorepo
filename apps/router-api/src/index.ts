import { Router } from "itty-router";
import { error, json, missing } from "itty-router-extras";
import { Chain, getSupportedDexs } from "./chains";

// Create parent router
const router = Router();

// Register v1 endpoint
const v1 = Router({ base: "/v1" });
router.all("/v1/*", v1.handle);

// GET /v1/chains
v1.get("/chains", async () => {
    return json({
        chains: Object.values(Chain).filter((v) => !isNaN(Number(v))),
    });
});

// GET /v1/:chainID/dexs
v1.get("/:chainId/dexs", async ({ params }) => {
    const chainId: string = params.chainId;
    if (!(chainId in Chain)) {
        return missing({ message: "Chain not supported" });
    }
    const dexs = getSupportedDexs(chainId);
    return json({ chain: Chain[chainId], dexs: dexs });
});

// Base router
router.get("/", async () => {
    return json({ message: "OK" });
});
router.all("*", async () => {
    return missing({ message: "Not found" });
});

// Export router
const worker: ExportedHandler<Bindings> = { fetch: router.handle };

export default worker;
export { worker };
