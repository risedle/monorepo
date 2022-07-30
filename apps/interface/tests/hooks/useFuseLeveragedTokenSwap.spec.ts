import useFuseLeveragedTokenSwap from "@/hooks/useFuseLeveragedTokenSwap";
import useFuseLeveragedTokenUserPosition from "@/hooks/useFuseLeveragedTokenUserPosition";
import { renderHook } from "@testing-library/react";
import * as SWR from "swr";

describe("useFuseLeveragedTokenUserPosition", () => {
    describe("Given undefined userAddress and wrong symbol", () => {
        it("should return isLoaded=false and data=undefined", async () => {
            const { result } = renderHook(() =>
                useFuseLeveragedTokenSwap("test", undefined)
            );
            expect(result.current.isLoaded).toBe(false);
            expect(result.current.data).toBe(undefined);
        });
    });

    describe("Given only symbol and address", () => {
        it("should return data", async () => {
            const mock = jest.spyOn(SWR, "default");

            mock.mockReturnValueOnce({
                data: { user: ["test"] },
            });

            const { result } = renderHook(() =>
                useFuseLeveragedTokenSwap(
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
                useFuseLeveragedTokenUserPosition("test", "test")
            );
            expect(result.current.isLoaded).toBe(false);
        });
    });
});
