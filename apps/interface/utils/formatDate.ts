export const formatDate = (ms: number): string => {
    const d = new Date(ms);
    const year = d.getUTCFullYear();
    const month = `${d.getUTCMonth() + 1}`.padStart(2, "0");
    const date = `${d.getUTCDate()}`.padStart(2, "0");

    return `${year}-${month}-${date}`;
};

export default formatDate;
