// Pre-render all the templates to HTML then feed up to TailwindCSS
import tailwindcss from "tailwindcss";
import postcss from "postcss";

const finders = [
    {
        prefix: "px-",
        pattern: /px="(?<value>.)"/gm,
    },
    {
        prefix: "py-",
        pattern: /py="(?<value>.)"/gm,
    },
];

/**
 * Convert props to utility class
 *
 * For example:
 *  px="4" -> px-4
 */
function propsToUtilityClass(content: string): Array<string> {
    console.log("propsToUtilityClass content", content);
    const results = new Array<string>();
    for (const finder of finders) {
        const matches = content.matchAll(finder.pattern);
        for (const match of matches) {
            console.log(match);
            const value = match.groups?.value;
            results.push(`${finder.prefix}${value}`);
        }
    }
    console.log("DEBUG: results", results);
    return results;
}

const config = {
    content: {
        files: [{ raw: `<Container px="4" py="4"></Container>` }],
        extract: {
            DEFAULT: propsToUtilityClass,
        },
    },
};

async function main() {
    const input = `
        @tailwind components;
        @tailwind utilities;
    `;
    const result = await postcss(tailwindcss(config)).process(input);
    console.log("css output: ", result.css);
}

main();
