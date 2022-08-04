import { getBaseConfig } from "@/utils/getBaseConfig";

/**
 * see here: https://stackoverflow.com/a/48042799
 */
describe("getBaseConfig", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        process.env = { ...OLD_ENV }; // Make a copy
    });

    afterEach(() => {
        process.env = OLD_ENV; // Restore old environment
    });

    describe("Given default value", () => {
        it("should return correct base config", () => {
            process.env.NEXT_PUBLIC_CHAIN_SLUG = undefined;
            process.env.NEXT_PUBLIC_CHAIN_ID = undefined;
            process.env.NEXT_PUBLIC_CHAIN_NAME = undefined;
            const baseConfig = getBaseConfig();

            expect(baseConfig.chainId).toBe(56);
            expect(baseConfig.chainSlug).toBe("bsc");
            expect(baseConfig.chainName).toBe("BSC");
            expect(baseConfig.baseURL).toBe("https://bsc.risedle.com");
        });
    });

    describe("Given BNB Smart Chain config", () => {
        it("should return correct base config", () => {
            process.env.NEXT_PUBLIC_CHAIN_SLUG = "bsc";
            process.env.NEXT_PUBLIC_CHAIN_ID = 56;
            process.env.NEXT_PUBLIC_CHAIN_NAME = "BSC";
            const baseConfig = getBaseConfig();

            expect(baseConfig.chainId).toBe(56);
            expect(baseConfig.chainSlug).toBe("bsc");
            expect(baseConfig.chainName).toBe("BSC");
            expect(baseConfig.baseURL).toBe("https://bsc.risedle.com");
        });
    });
});
