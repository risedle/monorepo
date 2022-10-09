/** @type {import('tailwindcss').Config} */
module.exports = {
    content: {
        files: ["./public/dist/**/*.tsx"],
        transform: {
            // pre-render to html
            tsx: (content) => {
                // console.log(content);
                return content;
            },
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
