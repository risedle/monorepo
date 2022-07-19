import { waitFor } from "@testing-library/react";

// simulate window resize
export async function fireResizeEvent(width) {
    // NOTE: Wrapped in waitFor to suppress 'act' warning
    await waitFor(async () => {
        window.innerWidth = width;
        window.innerHeight = 768;
        window.dispatchEvent(new Event("resize"));
    });
}
