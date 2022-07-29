import parseSlippageTolerance from "@/utils/parseSlippageTolerance";

describe("parseSlippageTolerance", () => {
    it("should return parser correctly", () => {
        const setSlippage = jest.fn();
        const parser = parseSlippageTolerance(setSlippage);
        parser("1,3");
        expect(setSlippage).toBeCalledWith("1.3");
    });
});
