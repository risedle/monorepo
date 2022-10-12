/**
 * Router Registry
 *
 * Register new router in this file.
 */
import { get } from "./lib";

/*****************************************************************************
 * Import controllers
 ****************************************************************************/
import HomeController from "~/controllers/home";
import StaticAssetsController from "~/controllers/static-assets";

/* Playgrounds */
import PlaygroundController from "~/controllers/playground";
import PlaygroundSlugController from "~/controllers/playground/slug";

/*****************************************************************************
 * Register controllers
 ****************************************************************************/
get("/", HomeController);
get("/static/*", StaticAssetsController);

/* Playgrounds */
get("/playground", PlaygroundController);
get("/playground/", PlaygroundController);
get("/playground/:slug", PlaygroundSlugController);
get("/playground/:slug/", PlaygroundSlugController);
