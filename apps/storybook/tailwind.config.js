/** @type {import('tailwindcss').Config} */
const path = require("path");

console.log("DEBUGGGG", require("@risedle/ui"));

module.exports = {
    content: [
        path.join(__dirname, "./stories/*.tsx"),
        path.join(__dirname, "../../packages/ui/**/*.tsx"),
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [require("@risedle/ui").presets],
};
