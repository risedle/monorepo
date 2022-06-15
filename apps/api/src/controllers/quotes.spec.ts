import quotes from "./quotes";
import { getMockReq, getMockRes } from "@jest-mock/express";

describe("GetQuotes", () => {
    describe("given empty query params", () => {
        it("should retun OK", async () => {
            const req = getMockReq();
            const { res, clearMockRes } = getMockRes();
            await quotes.GetQuotes(req, res);
            expect(res.send).toBeCalledWith({ message: "OK" });
            clearMockRes();
        });
    });
});
