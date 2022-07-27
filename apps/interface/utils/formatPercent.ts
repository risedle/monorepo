export const formatPercent = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
    signDisplay: "always",
}).format;

export default formatPercent;
