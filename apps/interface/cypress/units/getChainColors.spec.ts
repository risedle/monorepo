import { getChainColors } from "../../utils/getChainColors.ts";

/**
 * see here: https://stackoverflow.com/a/48042799
 */
describe("getChainColors", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        process.env = { ...OLD_ENV }; // Make a copy
    });

    afterEach(() => {
        process.env = OLD_ENV; // Restore old environment
    });

    describe("Given BNB Smart Chain config", () => {
        it("should return correct base config", () => {
            process.env.NEXT_PUBLIC_CHAIN_SLUG = "bsc";
            process.env.NEXT_PUBLIC_CHAIN_ID = 56;
            process.env.NEXT_PUBLIC_CHAIN_NAME = "BNB Smart Chain";
            const colors = getChainColors();
            expect(colors).to.eq(
                "dark:text-amber-dark-11 text-amber-light-11 dark:fill-amber-dark-11 fill-amber-light-11 dark:divide-amber-dark-11/10 divide-amber-light-11/10"
            );
        });
    });

    describe("Given unsupported chain", () => {
        it("should return correct base config", () => {
            process.env.NEXT_PUBLIC_CHAIN_SLUG = "ok";
            process.env.NEXT_PUBLIC_CHAIN_ID = 1234;
            process.env.NEXT_PUBLIC_CHAIN_NAME = "LOL Chain";
            const colors = getChainColors();
            expect(colors).to.eq("text-black");
        });
    });
});
