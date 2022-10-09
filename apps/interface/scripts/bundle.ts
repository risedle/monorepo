/**
 * esbuild-plugin-tailwincss
 *
 * This is our custom esbuild plugin.
 *
 * TODO(pyk): Publish this as `@risedle/esbuild-plugin-tailwindcss`
 */

import type { Plugin, PluginBuild, OnLoadArgs, OnLoadResult } from "esbuild";
import { readFile } from "fs/promises";
import tailwindcss from "tailwindcss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

const tailwind: Plugin = {
    name: "tailwind",
    setup: (build: PluginBuild) => {
        const options = {
            filter: /.\.(css)$/,
            namespace: "file",
        };

        const callback = async (args: OnLoadArgs): Promise<OnLoadResult> => {
            const css = await readFile(args.path, "utf-8");

            const result = await postcss([tailwindcss, autoprefixer]).process(
                css,
                {
                    from: args.path,
                }
            );
            return {
                contents: result.css,
                loader: "css",
            };
        };
        build.onLoad(options, callback);
    },
};

/**
 * esbuild-plugin-prerender
 *
 * esbuild plugin that used to pre-render react component to HTML
 */
import React from "react";
import ReactDOMServer from "react-dom/server";
import type { OnResolveArgs, OnResolveResult } from "esbuild";

const prerender: Plugin = {
    name: "prerender",
    setup: ({ initialOptions, onResolve, onLoad, esbuild }: PluginBuild) => {
        const options = {
            ...initialOptions,
            bundle: true,
            format: "cjs",
            metafile: true,
            minify: false,
        };

        onResolve(
            {
                filter: /[?&]prerender\b/,
            },
            (args: OnResolveArgs): OnResolveResult => {
                const { path, resolveDir } = args;
                const { pathname } = new URL(path, `file://${resolveDir}/`);
                return { namespace: "prerender", path: pathname };
            }
        );

        onLoad(
            {
                filter: /.*/,
                namespace: "prerender",
            },
            async (args: OnLoadArgs): Promise<OnLoadResult> => {
                const { path } = args;
                // @ts-ignore
                const { metafile } = await esbuild.build({
                    // @ts-ignore
                    ...options,
                    entryPoints: { "prepare.temp": path },
                });
                const outputs = metafile?.outputs;
                if (!outputs) return { loader: "js", contents: "" };

                const file = Object.keys(outputs).find((path) =>
                    /\.m?js$/.test(path)
                );
                console.log("DEBUG: file", file);
                if (!file) return { loader: "js", contents: "" };
                const component = await import(
                    "/Users/pyk/github/risedle/monorepo/apps/interface/" + file
                );
                console.log("dEBUG: component", component);

                const contents = await ReactDOMServer.renderToStaticMarkup(
                    React.createElement(component.default, {})
                );

                return { loader: "file", contents };
            }
        );
    },
};

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
        global: "global.css",
        // "client.home": "clients/home/index.ts",
        // "server.home": "templates/home/index.tsx",
        "prerender.home": "templates/home/index.tsx?prerender",
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
        plugins: [tailwind, prerender],
    });

    // Remove server side code

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
