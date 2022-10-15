import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        reporters: ["verbose"],
        environment: "miniflare",
        include: [
            "tests/integration/**/*.{test,spec}.{ts,tsx}",
            "atoms/**/*spec.tsx",
        ],
        coverage: {
            provider: "c8",
        },
    },
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "."),
            "react-dom/server": path.resolve(
                __dirname,
                "node_modules/react-dom/server.browser.js"
            ),
            __STATIC_CONTENT_MANIFEST: path.resolve(
                __dirname,
                "tests/worker.manifest.ts"
            ),
        },
    },
});
