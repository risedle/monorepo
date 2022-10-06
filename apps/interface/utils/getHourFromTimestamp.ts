export const getHourFromTimestamp = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
}).format;
