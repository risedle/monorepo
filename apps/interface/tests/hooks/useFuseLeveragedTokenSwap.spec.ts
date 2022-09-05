import useFuseLeveragedTokenMySwap from "@/hooks/useFuseLeveragedTokenMySwap";
import { renderHook } from "@testing-library/react";
import * as SWR from "swr";

describe("useFuseLeveragedTokenMySwap", () => {
    describe("Given undefined userAddress and wrong symbol", () => {
        it("should return isLoaded=false and data=undefined", async () => {
            const { result } = renderHook(() =>
                useFuseLeveragedTokenMySwap("test", undefined)
            );
            expect(result.current.isLoaded).toBe(false);
            expect(result.current.data).toBe(undefined);
        });
    });

    describe("Given symbol and address", () => {
        it("should return data", async () => {
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValueOnce({
                data: {
                    user: [
                        {
                            timestamp: "1",
                            transaction: { id: "1" },
                            amountInUSD: "1",
                            tokenIn: { symbol: "A" },
                            tokenOut: { symbol: "B" },
                        },
                        {
                            timestamp: "2",
                            transaction: { id: "2" },
                            amountInUSD: "1",
                            tokenIn: { symbol: "C" },
                            tokenOut: { symbol: "B" },
                        },
                    ],
                },
            });

            const { result } = renderHook(() =>
                useFuseLeveragedTokenMySwap(
                    "ETHRISE",
                    "0x0000000000000000000000000000000000000000"
                )
            );
            expect(Array.isArray(result.current.data?.user)).toBe(true);
            expect(result.current.isLoaded).toBe(true);
        });
    });

    describe("Given failed response", () => {
        it("should return isLoaded=false", async () => {
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValueOnce({
                data: null,
                error: "error message",
            });
            const { result } = renderHook(() =>
                useFuseLeveragedTokenMySwap("test", "test")
            );
            expect(result.current.isLoaded).toBe(false);
        });
    });

    describe("Given empty data", () => {
        it("should return isLoaded=false", async () => {
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValueOnce({
                data: null,
            });
            const { result } = renderHook(() =>
                useFuseLeveragedTokenMySwap("test", null)
            );
            expect(result.current.isLoaded).toBe(true);
            expect(result.current.data).toBe(null);
        });
    });
});
