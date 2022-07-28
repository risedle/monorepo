import getTransactionExplorerURL from "@/utils/getTransactionExplorerURL";

describe("getTransactionExplorerURL", () => {
    it("should return correct url", () => {
        const url = getTransactionExplorerURL("test");
        expect(url).toBe("https://bscscan.com/tx/test");
    });
});
