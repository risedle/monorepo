import { renderHook, waitFor, act } from "@testing-library/react";
import * as SWR from "swr";

import { useFuseLeveragedTokenInfo } from "../../hooks/useFuseLeveragedTokenInfo";

describe("useFuseLeveragedTokenInfo", () => {
    describe("Given succesfull response", () => {
        it("should return isLoaded=true", async () => {
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValueOnce({
                data: "ok",
            });
            const { result } = renderHook(() =>
                useFuseLeveragedTokenInfo("test")
            );
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
                useFuseLeveragedTokenInfo("test")
            );
            expect(result.current.isLoaded).toBe(false);
        });
    });
});
