import { getTokenInfoFromPancakeSwapSubgraph } from "./tokens";

describe("getTokenInfoFromPancakeSwapSubgraph", () => {
    describe("given empty array", () => {
        it("should return empty array", async () => {
            const tokens = await getTokenInfoFromPancakeSwapSubgraph([]);
            expect(tokens.length).toBe(0);
            expect(tokens).toStrictEqual([]);
        });
    });

    describe("given invalid address", () => {
        it("should return array of undefined", async () => {
            const tokens = await getTokenInfoFromPancakeSwapSubgraph([
                "a",
                "b",
            ]);
            expect(tokens.length).toBe(2);
            expect(tokens).toStrictEqual([undefined, undefined]);
        });
    });

    describe("given valid and invalid address", () => {
        it("should return partially", async () => {
            const tokens = await getTokenInfoFromPancakeSwapSubgraph([
                // BUSD
                "0xe9e7cea3dedca5984780bafc599bd69add087d56",
                // Invalid
                "a",
            ]);
            expect(tokens.length).toBe(2);
            expect(tokens[0]!.name).toBe("BUSD Token");
            expect(tokens[0]!.symbol).toBe("BUSD");
            expect(tokens[0]!.decimals).toBe(18);
            expect(tokens[0]!.address).toBe(
                "0xe9e7cea3dedca5984780bafc599bd69add087d56"
            );
            expect(tokens[0]!.priceUSD).toBeGreaterThan(0.8);
            expect(tokens[0]!.dailyPriceChangeUSD).toBeTruthy();
            expect(tokens[0]!.dailyPriceChangePercentage).toBeTruthy();
            expect(tokens[0]!.volumeUSD).toBeGreaterThan(1000000);
            expect(tokens[0]!.dailyVolumeChangeUSD).toBeTruthy();
            expect(tokens[0]!.dailyVolumeChangePercentage).toBeTruthy();
            expect(tokens[0]!.totalLiquidity).toBeTruthy();
            expect(tokens[0]!.totalLiquidityUSD).toBeTruthy();
            expect(tokens[1]).toBe(undefined);
        });
    });

    describe("given valid address", () => {
        it("should return all", async () => {
            const tokens = await getTokenInfoFromPancakeSwapSubgraph([
                // BUSD
                "0xe9e7cea3dedca5984780bafc599bd69add087d56",
                // USDC
                "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
            ]);
            expect(tokens.length).toBe(2);

            expect(tokens[0]!.name).toBe("BUSD Token");
            expect(tokens[0]!.symbol).toBe("BUSD");
            expect(tokens[0]!.decimals).toBe(18);
            expect(tokens[0]!.address).toBe(
                "0xe9e7cea3dedca5984780bafc599bd69add087d56"
            );
            expect(tokens[0]!.priceUSD).toBeGreaterThan(0.8);
            expect(tokens[0]!.dailyPriceChangeUSD).toBeTruthy();
            expect(tokens[0]!.dailyPriceChangePercentage).toBeTruthy();
            expect(tokens[0]!.volumeUSD).toBeGreaterThan(1000000);
            expect(tokens[0]!.dailyVolumeChangeUSD).toBeTruthy();
            expect(tokens[0]!.dailyVolumeChangePercentage).toBeTruthy();
            expect(tokens[1]!.totalLiquidity).toBeTruthy();
            expect(tokens[0]!.totalLiquidityUSD).toBeTruthy();

            expect(tokens[1]!.name).toBe("USD Coin");
            expect(tokens[1]!.symbol).toBe("USDC");
            expect(tokens[1]!.decimals).toBe(18);
            expect(tokens[1]!.address).toBe(
                "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
            );
            expect(tokens[1]!.priceUSD).toBeGreaterThan(0.8);
            expect(tokens[1]!.dailyPriceChangeUSD).toBeTruthy();
            expect(tokens[1]!.dailyPriceChangePercentage).toBeTruthy();
            expect(tokens[1]!.volumeUSD).toBeGreaterThan(1111111);
            expect(tokens[1]!.dailyVolumeChangeUSD).toBeTruthy();
            expect(tokens[1]!.dailyVolumeChangePercentage).toBeTruthy();
            expect(tokens[1]!.totalLiquidity).toBeTruthy();
            expect(tokens[1]!.totalLiquidityUSD).toBeTruthy();
        });
    });
});
