/**
 * Router Registry
 *
 * Register new router in this file.
 */
import { get } from "./lib";

/**
 * Import controllers
 */
import HomeController from "@/controllers/home";
import StaticAssetsController from "@/controllers/static-assets";

/**
 * Register controllers
 */
get("/", HomeController);
get("/static/*", StaticAssetsController);
