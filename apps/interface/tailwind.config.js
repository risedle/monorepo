/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./templates/**/*.tsx"],
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
