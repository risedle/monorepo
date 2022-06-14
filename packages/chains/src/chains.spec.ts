/**
 * Chains spec
 */
import { Chain } from "./index";

describe("Supported chains", () => {
    it("should support Mainnet", () => {
        expect(1 in Chain).toBe(true);
        expect("Mainnet" in Chain).toBe(true);
    });

    it("should support Arbitrum", () => {
        expect(42161 in Chain).toBe(true);
        expect("Arbitrum" in Chain).toBe(true);
    });
});
