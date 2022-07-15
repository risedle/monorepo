import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    collectCoverage: true,
    collectCoverageFrom: ["./src/**"],
    coverageThreshold: {
        global: {
            lines: 90,
        },
    },
};

export default config;
