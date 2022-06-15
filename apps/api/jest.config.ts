import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};

export default config;
