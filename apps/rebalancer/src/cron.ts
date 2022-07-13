import cron from "node-cron";
import { run } from "./rebalance";

const task = cron.schedule("*/5 * * * *", async () => {
    try {
        await run();
    } catch (e) {
        console.error("Failed to rebalance:", e);
    }
});

process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Stopping cron job ...");
    task.stop();
    console.log("Cronjob stopped ...");
});
