export const formatTimestamp = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
    minute: "numeric",
}).format;
