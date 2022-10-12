/*****************************************************************************
 * esbuild-plugin-mdx-to-json
 *
 * Pre-render bundled MDX file to JSON format.
 *
 * { "title": "...", "description": "...", "content": "..."}
 ****************************************************************************/
import type {
    Plugin,
    PluginBuild,
    BuildResult,
    OnLoadArgs,
    OnLoadResult,
} from "esbuild";
import consola from "consola";
import path from "node:path";
import process from "node:process";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { writeFile } from "node:fs/promises";

function mdxToJson(): Plugin {
    const name = "esbuild-plugin-mdx-to-json";

    return { name, setup };

    async function setup(build: PluginBuild): Promise<void> {
        build.onEnd(onEnd);

        async function onEnd(result: BuildResult) {
            const metafile = result.metafile;
            if (!metafile) {
                throw new Error("Set metafile=true in esbuild options");
            }
            const outputs = metafile.outputs;
            for (const jsPath of Object.keys(outputs)) {
                const importPath = path.join(process.cwd(), jsPath);
                // NOTE: disable cache on ESM dynamic import
                const mod = await import(`${importPath}?v=${Date.now()}`);

                const title = mod.title;
                if (!title) {
                    consola.warn(`${jsPath}: title undefined, skipped`);
                    continue;
                }
                const description = mod.description;
                if (!description) {
                    consola.warn(`${jsPath}: description undefined, skipped`);
                    continue;
                }
                // Render HTML content
                const content = renderToString(createElement(mod.default));
                const data = JSON.stringify({ title, description, content });
                await writeFile(importPath.replace(".mjs", ".json"), data);
            }
        }
    }
}

/*****************************************************************************
 * Convert MDX files to static site
 *
 * Input: List of MDX files
 * Output: List of JSON files
 ****************************************************************************/
import esbuild from "esbuild";
import mdx from "@mdx-js/esbuild";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import fg from "fast-glob";

/* Build entrypoints, map component name to source file */
const paths = await fg([
    "atoms/**/*.mdx",
    "molecules/**/*.mdx",
    "organisms/**/*.mdx",
]);

const entryPoints = paths
    .map((path) => {
        const dirs = path.split("/");
        const componentName = dirs[dirs.length - 2];
        return [componentName, path];
    })
    .reduce((entry: { [key: string]: string }, v: Array<string>) => {
        entry[v[0]] = v[1];
        return entry;
    }, {});

// Add react-dom
entryPoints["react-dom"] = "./templates/playground/react-dom.mts";

/* Run esbuild */
const isProduction = process.env.NODE_ENV == "production" ? true : false;
await esbuild.build({
    entryPoints: entryPoints,
    outdir: "public/playground",
    bundle: true,
    minify: isProduction,
    watch: !isProduction,
    format: "esm",
    metafile: true,
    tsconfig: "scripts/tsconfig.esm.json",
    plugins: [
        mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }),
        mdxToJson(),
    ],
    outExtension: { ".js": ".mjs" },
});
