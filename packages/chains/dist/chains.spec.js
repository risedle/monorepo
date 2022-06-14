"use strict";
exports.__esModule = true;
/**
 * Chains spec
 */
var index_1 = require("./index");
describe("Supported chains", function () {
    it("should support Mainnet", function () {
        expect(1 in index_1.Chain).toBe(true);
        expect("Mainnet" in index_1.Chain).toBe(true);
    });
    it("should support Arbitrum", function () {
        expect(42161 in index_1.Chain).toBe(true);
        expect("Arbitrum" in index_1.Chain).toBe(true);
    });
});
