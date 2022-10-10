const { twx } = require("./scripts/build/twx.js");

/** @type {import('tailwindcss').Config} */
const files = ["./templates/**/*.tsx"];
module.exports = {
    content: {
        files: files,
        transform: {
            // pre-render to html
            tsx: twx(files),
        },
    },
    theme: {
        extend: {
            colors: {
                base: {
                    primary: "#03050D",
                    secondary: "#141724",
                },
                label: {
                    primary: "#FCFDFF",
                },
            },
        },
    },
    plugins: [],
};
