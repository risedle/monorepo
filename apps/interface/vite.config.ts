import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        environment: "miniflare",
        include: ["tests/integration/**/*.{test,spec}.{ts,tsx}"],
        coverage: {
            provider: "c8",
            all: true,
            exclude: [
                ".next",
                "abis",
                "components",
                "tests",
                "utils",
                "hooks",
                "out",
                "pages",
                "themes",
                "*.config*",
                "env.ts",
                "jest*",
                "next-*",
            ],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "."),
            "react-dom/server": path.resolve(
                __dirname,
                "node_modules/react-dom/server.browser.js"
            ),
        },
    },
});
