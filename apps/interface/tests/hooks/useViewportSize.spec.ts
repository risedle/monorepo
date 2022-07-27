import { renderHook, act } from "@testing-library/react";
import { fireResizeEvent } from "../utils/fireResizeEvent";
import {
    useViewportSize,
    useViewportTablet,
    useViewportLaptop,
    useViewportDesktop,
} from "@/hooks/useViewportSize";

describe("useViewportSize()", () => {
    it("should track screen size", async () => {
        const { result } = renderHook(() => useViewportSize());

        // Assert initial states; default jest-dom
        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(768);

        // Resize screen
        await fireResizeEvent(320);
        expect(result.current.width).toBe(320);
        expect(result.current.height).toBe(768);

        // Resize screen
        await fireResizeEvent(640);
        expect(result.current.width).toBe(640);
        expect(result.current.height).toBe(768);
    });
});

describe("useViewportTablet()", () => {
    it("should track screen size", async () => {
        const { result } = renderHook(() => useViewportTablet());

        // Resize screen
        await fireResizeEvent(320);
        expect(result.current).toBe(false);

        // Resize screen
        await fireResizeEvent(680);
        expect(result.current).toBe(true);

        // Resize screen
        await fireResizeEvent(720);
        expect(result.current).toBe(true);

        // Resize screen
        await fireResizeEvent(1440);
        expect(result.current).toBe(true);
    });
});

describe("useViewportLaptop()", () => {
    it("should track screen size", async () => {
        const { result } = renderHook(() => useViewportLaptop());

        // Resize screen
        await fireResizeEvent(320);
        expect(result.current).toBe(false);

        // Resize screen
        await fireResizeEvent(680);
        expect(result.current).toBe(false);

        // Resize screen
        await fireResizeEvent(720);
        expect(result.current).toBe(false);

        // Resize screen
        await fireResizeEvent(1024);
        expect(result.current).toBe(true);

        // Resize screen
        await fireResizeEvent(1440);
        expect(result.current).toBe(true);
    });
});

describe("useViewportDesktop()", () => {
    it("should track screen size", async () => {
        const { result } = renderHook(() => useViewportDesktop());

        // Resize screen
        await fireResizeEvent(320);
        expect(result.current).toBe(false);

        // Resize screen
        await fireResizeEvent(680);
        expect(result.current).toBe(false);

        // Resize screen
        await fireResizeEvent(720);
        expect(result.current).toBe(false);

        // Resize screen
        await fireResizeEvent(1024);
        expect(result.current).toBe(false);

        // Resize screen
        await fireResizeEvent(1440);
        expect(result.current).toBe(true);
    });
});
