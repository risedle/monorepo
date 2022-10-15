/*****************************************************************************
 * TailwindCSS Utility Class
 ****************************************************************************/

const BoolPropsPrefix = {
    // Container
    container: "container",

    // Flex
    flex: "flex",
};

const ValuePropsPrefix = {
    // Flex
    direction: "flex",
    justify: "justify",

    // Padding
    p: "p",
    pt: "pt",
    pr: "pr",
    pb: "pb",
    pl: "pl",
    px: "px",
    py: "py",

    // Margin
    m: "m",
    mt: "mt",
    mr: "mr",
    mb: "mb",
    ml: "ml",
    mx: "mx",
    my: "my",

    // Sizing
    w: "w",
    maxW: "max-w",
};

const UtilityPropsPrefix = { ...BoolPropsPrefix, ...ValuePropsPrefix };

type MapToProps<Type> = {
    [Property in keyof Type]?: boolean | string;
};

export type UtilityProps = MapToProps<typeof BoolPropsPrefix> &
    MapToProps<typeof ValuePropsPrefix>;

export function isUtilityProps(key: string): boolean {
    return key in UtilityPropsPrefix;
}

export function cls(props: UtilityProps): string | undefined {
    const keys = Object.keys(props) as (keyof UtilityProps)[];
    if (keys.length == 0) return undefined;

    const c: Array<string> = [];
    for (const key of keys) {
        const prefix = UtilityPropsPrefix[key];
        const value = props[key];
        if (typeof value == "boolean" && value) {
            c.push(prefix);
            continue;
        }
        if (typeof value == "string") {
            if (key in BoolPropsPrefix) {
                c.push(`${value}:${prefix}`);
                continue;
            }

            const cls = parseClassFromString(prefix, value);
            c.push(cls);
            continue;
        }
    }
    return c.length == 0 ? undefined : c.join(" ");
}

/*****************************************************************************
 * CSS Units
 ****************************************************************************/
const absoluteUnits = ["cm", "mm", "Q", "in", "pc", "pt", "px"];
const relativeUnits = [
    "em",
    "ex",
    "ch",
    "rem",
    "lh",
    "rlh",
    "vw",
    "vh",
    "vmin",
    "vmax",
    "vb",
    "vi",
    "svw",
    "svh",
    "lvw",
    "lvh",
    "dvw",
    "dvh",
];
const percentageUnits = ["%"];
const colorUnits = ["#", "rgb", "hsl"];
const imageUnits = ["url"];
const cssUnits = absoluteUnits
    .concat(relativeUnits)
    .concat(percentageUnits)
    .concat(colorUnits)
    .concat(imageUnits);

/*****************************************************************************
 * Parse sequence of string to utility class
 ****************************************************************************/
/**
 * parseClassFromString transform props (key,value) to class name.
 *
 * For example:
 * ("px", "4 md:5") -> "px-4 md:px-5"
 */
const parseClassFromString = (key: string, v: string): string => {
    const inputs = v.split(" ");
    const outputs = [];
    for (const input of inputs) {
        const prefixes = input.split(":");
        const lastValue = prefixes.pop();
        if (!lastValue) continue;
        const unit = cssUnits.find((unit) => lastValue.includes(unit));
        const prefix = prefixes.join(":");

        // Treat string that have css units as arbitary value
        if (unit && unit != lastValue) {
            if (prefix != "") {
                outputs.push(`${prefix}:${key}-[${lastValue}]`);
            } else {
                outputs.push(`${key}-[${lastValue}]`);
            }
        } else {
            // Otherwise use the value directly
            if (prefix != "") {
                outputs.push(`${prefix}:${key}-${lastValue}`);
            } else {
                outputs.push(`${key}-${lastValue}`);
            }
        }
    }
    return outputs.join(" ");
};
