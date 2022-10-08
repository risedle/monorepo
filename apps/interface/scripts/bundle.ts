/**
 * Bundle
 *
 * Script to bundle and minify the client-side JavaScript.
 *
 * Set `NODE_ENV=production` to enable production bundling.
 */

import { build, analyzeMetafile } from "esbuild";

async function main() {
    // Add new bundle here
    // TODO(pyk): we may use glob pattern here such as "client/*.ts" to
    // automatically bundle all entrypoints
    const entryPoints = {
        home: "clients/home/index.ts",
    };

    const isProduction = process.env.NODE_ENV == "production" ? true : false;
    const result = await build({
        entryPoints: entryPoints,
        outdir: "public/dist",
        bundle: true,
        minify: isProduction,
        metafile: isProduction,
        watch: !isProduction,
        sourcemap: !isProduction,
        target: ["chrome58", "firefox57", "safari11", "edge18"],
        charset: "utf8",
        tsconfig: "tsconfig.exchange.json",
    });

    // Show report when we do bundling for production
    if (isProduction && result.metafile == null) {
        console.warn("NODE_ENV is set to production but there is no metafile");
        return;
    }
    if (isProduction && result.metafile) {
        const report = await analyzeMetafile(result.metafile, {
            verbose: true,
        });
        console.log(report);
    }
}

main();
