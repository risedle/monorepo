import { formatPercent } from "../../utils/formatPercent";

describe("formatPercent", () => {
    it("should return correct percent string", () => {
        const percent = formatPercent(0.12345);
        expect(percent).toBe("+12.35%");
    });
});
