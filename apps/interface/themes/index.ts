import { extendTheme } from "@chakra-ui/react";
import type { StyleConfig } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

import colors from "./colors";
import Button from "./components/Button";

// Breakpoints
const breakpoints = {
    tablet: "640px", // => @media (min-width: 640px) { ... }
    laptop: "1024px", // => @media (min-width: 1024px) { ... }
    desktop: "1280px", // => @media (min-width: 1280px) { ... }
};

const theme = extendTheme({
    components: {
        Button,
    },
    colors,
    breakpoints,
    fonts: {
        body: '"Inter", sans-serif;',
        mono: '"IBM Plex Mono", monospace;',
    },
    config: {
        cssVarPrefix: "risedle",
    },
    initialColorMode: "light",
    useSystemColorMode: false,
    styles: {
        global: (props: any) => ({
            body: {
                bg: mode("#FCFCFC", "#161616")(props),
                backgroundImage: mode(
                    "url(/backgrounds/bsc-light.png)",
                    "url(/backgrounds/bsc-dark.png)"
                )(props),
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "center",
                //backgroundPositionY: { base: "-276%" },
                //backgroundSize: { base: "300%", desktop: "1000px 1000px" },
                backgroundSize: "1000px 1000px",
                backgroundPositionY: "-583px",
            },
        }),
    },
});

export default theme;
