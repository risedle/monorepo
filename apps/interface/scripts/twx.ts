import fs from "fs";
import esbuild from "esbuild";
import fg from "fast-glob";
import React from "react";
import ReactDOMServer from "react-dom/server";

export const twx = (files: Array<string>) => {
    return (content: string): string => {
        // Find the path
        const paths = fg.sync(files);
        const path = paths.find((path) => {
            const data = fs.readFileSync(path, "utf8");
            return data == content;
        });
        if (!path) return content;

        // Build the tsx as commonjs module
        const buildOptions = {
            bundle: true,
            format: "cjs",
            write: false,
            minify: false,
            entryPoints: [path],
            target: ["chrome58", "firefox57", "safari11", "edge18"],
            charset: "utf8",
            outdir: "twx",
            tsconfig: "tsconfig.exchange.json",
        };
        // @ts-ignore
        const { outputFiles } = esbuild.buildSync(buildOptions);
        const output = outputFiles.find(({ path }) => /\.m?js$/.test(path));
        if (!output) return content;

        const Module = module.constructor;
        // @ts-ignore
        const Component = new Module();
        Component._compile(output.text, "");
        const renderedContent = ReactDOMServer.renderToStaticMarkup(
            React.createElement(Component.exports.default, {})
        );
        return renderedContent;
    };
};
