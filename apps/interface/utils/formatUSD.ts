export const formatUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
}).format;
