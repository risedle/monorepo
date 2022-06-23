/** @type {import('tailwindcss').Config} */
const path = require("path");
module.exports = {
    content: [
        path.join(__dirname, "./stories/*.tsx"),
        path.join(__dirname, "../../packages/ui/**/*.tsx"),
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
