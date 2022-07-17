import { useBaseURL } from "../../hooks/useBaseURL";

/**
 * see here: https://stackoverflow.com/a/48042799
 */
describe("useBaseURL", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });

    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });

    describe("Given NEXT_PUBLIC_CHAIN_SLUG='bsc'", () => {
        it("should return https://bsc.risedle.com", () => {
            process.env.NEXT_PUBLIC_CHAIN_SLUG = "bsc";
            const baseURL = useBaseURL();
            expect(baseURL).toBe("https://bsc.risedle.com");
        });
    });
});
