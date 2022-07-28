import isValidInputAmount from "@/utils/isValidInputAmount";

describe("isValidInputAmount", () => {
    describe("Given alphabet", () => {
        it("should return false", () => {
            const res = isValidInputAmount("a");
            expect(res).toBeFalsy();
        });
    });
    describe("Given comma, dot and number", () => {
        it("should return true", () => {
            let res = isValidInputAmount(",");
            expect(res).toBeTruthy();
            res = isValidInputAmount(".");
            expect(res).toBeTruthy();
            res = isValidInputAmount("1");
            expect(res).toBeTruthy();
        });
    });
});
