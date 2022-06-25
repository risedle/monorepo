const { build } = require("esbuild");
const { dependencies } = require("./package.json");
const { Generator } = require("npm-dts");

const shared = {
    entryPoints: ["./src/index.ts"],
    bundle: true,
    tsconfig: "./tsconfig.json",
    // minify: true,
    external: Object.keys(dependencies),
};

// For browser
build({
    ...shared,
    format: "esm",
    outfile: "./dist/index.esm.js",
});

// For node
build({
    ...shared,
    outfile: "./dist/index.cjs.js",
    format: "cjs",
    platform: "node",
});

// Type definitions
new Generator({
    entry: "./src/index.ts",
    output: "./dist/index.d.ts",
}).generate();
