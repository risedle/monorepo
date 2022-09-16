import nextJest from "next/jest";

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and
    // .env files in your test environment
    dir: "./",
});

const customJestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
    verbose: true,
    testMatch: ["<rootDir>/tests/**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "utils/*.ts",
        "components/**/*.tsx",
        "pages/**/*.tsx",
        "hooks/**/*.ts",
        // Ignore untestable files
        "!utils/theme.ts",
        "!utils/fetcher.ts",
        "!pages/_app.tsx",
        "!pages/_document.tsx",
        "!components/ConnectWalletButton/index.tsx",
        "!components/RainbowKitContainer/index.tsx",
    ],
    coverageThreshold: {
        global: {
            lines: 95,
        },
    },
    reporters: ["default", "github-actions"],
    setupFilesAfterEnv: ["./jest.setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
};

const config = createJestConfig(customJestConfig);
export default config;
