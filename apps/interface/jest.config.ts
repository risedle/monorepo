import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const config = createJestConfig({
    verbose: true,
    testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
    //transform: {
    //    "^.+\\.tsx?$": "ts-jest",
    //},
    collectCoverage: true,
    collectCoverageFrom: [
        "pages/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "hooks/**/*.{ts,tsx}",
        "utils/**/*.{ts,tsx}",
    ],
    coverageThreshold: {
        global: {
            lines: 95,
        },
    },
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
});

export default config;
