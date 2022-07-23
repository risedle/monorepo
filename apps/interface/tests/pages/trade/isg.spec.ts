import { getStaticPaths, getStaticProps } from "../../../pages/trade/[symbol]";

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
});
