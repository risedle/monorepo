import { useState, useEffect } from "react";

interface ViewportSize {
    width: number;
    height: number;
}

/**
 * Hook to get current viewport size
 */
export function useViewportSize(): ViewportSize {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { width, height };
}

/**
 * This hook will return true if screen size is larger than tablet
 */
export function useViewportTablet(): boolean {
    const dim = useViewportSize();
    return dim.width >= 680 ? true : false;
}

/**
 * This hook will return true if screen size is larger than laptop
 */
export function useViewportLaptop(): boolean {
    const dim = useViewportSize();
    return dim.width >= 1024 ? true : false;
}

/**
 * This hook will return true if screen size is larger than desktop
 */
export function useViewportDesktop(): boolean {
    const dim = useViewportSize();
    return dim.width >= 1280 ? true : false;
}
