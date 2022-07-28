import replacer from "@/utils/replacer";

describe("replacer", () => {
    it("returns function that can replace string", () => {
        const callback = jest.fn();
        const replace = replacer("ello", "ai", callback);
        replace("hello");
        expect(callback).toBeCalledWith("hai");
    });
});
