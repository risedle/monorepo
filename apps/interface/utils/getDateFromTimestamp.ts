export const getDateFromTimestamp = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
}).format;

export default getDateFromTimestamp;
