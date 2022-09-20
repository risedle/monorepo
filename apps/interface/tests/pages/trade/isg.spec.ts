import { getStaticPaths, getStaticProps } from "@/pages/trade/[symbol]";

describe("getStaticPaths", () => {
    it("should return list of symbol", async () => {
        const data = await getStaticPaths();
        expect(data.fallback).toBe(false);
        expect(data.paths.length).toBeGreaterThanOrEqual(2);
    });
});

describe("getStaticProps", () => {
    describe("Given BNBDROP as asymbol", () => {
        it("should return correct data", async () => {
            const data = await getStaticProps({
                params: { symbol: "BNBDROP" },
            });
            expect(data.revalidate).toBe(3600);
            expect(data.props.symbol).toBe("BNBDROP");
        });
    });
    describe("Given Null params", () => {
        it("should throw error:Trade: params is undefined", async () => {
            await expect(
                getStaticProps({
                    params: null,
                })
            ).rejects.toThrow("Trade: params is undefined");
        });
    });

    describe("Given Null symbols", () => {
        it("should throw error:Trade: symbol is undefined", async () => {
            await expect(
                getStaticProps({
                    params: {
                        symbol: null,
                    },
                })
            ).rejects.toThrow("Trade: symbol is undefined");
        });
    });
    describe("Given Array simbols", () => {
        it("should throw error:Trade: symbol invalid", async () => {
            await expect(
                getStaticProps({
                    params: {
                        symbol: ["BNBDROP", "BNBRISE"],
                    },
                })
            ).rejects.toThrow("Trade: symbol invalid");
        });
    });
});
