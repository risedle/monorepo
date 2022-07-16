import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/services/*.ts",
        "src/routers/*.ts",
        "src/controllers/*.ts",
        "src/utils/*.ts",
        "src/server.ts",
    ],
    coverageThreshold: {
        global: {
            lines: 95,
        },
    },
};

export default config;
