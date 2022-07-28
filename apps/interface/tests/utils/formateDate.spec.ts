import { formatDate } from "@/utils/formatDate";

describe("formatDate", () => {
    it("should return correct string", () => {
        const date = formatDate(1658857453 * 1000);
        expect(date).toBe("2022-07-26");
    });
});
