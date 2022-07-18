/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./utils/**/*.ts",
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ["'Inter'", "sans-serif"],
                ibm: ["'IBM Plex Mono'", "monospace"],
                space: ["'Space Mono'", "monospace"],
            },
            colors: {
                amber: {
                    light: {
                        11: "#AD5700",
                    },
                    dark: {
                        11: "#F1A10D",
                    },
                },
                gray: {
                    light: {
                        4: "#EDEDED",
                        11: "#6F6F6F",
                    },
                    dark: {
                        4: "#282828",
                        11: "#A0A0A0",
                    },
                },
            },
        },
    },
    plugins: [],
};
