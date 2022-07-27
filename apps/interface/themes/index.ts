import { extendTheme } from "@chakra-ui/react";
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
    initialColorMode: "dark",
    useSystemColorMode: false,
    styles: {
        global: (props: any) => ({
            body: {
                bg: mode("#FCFCFC", "#161616")(props),
            },
        }),
    },
});

export default theme;
