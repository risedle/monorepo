import cron from "node-cron";
import * as Sentry from "@sentry/node";
import "@sentry/tracing";

import { SENTRY_DSN } from "./config";
import { run } from "./rebalance";

Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
});

const task = cron.schedule("*/5 * * * *", async () => {
    try {
        await run();
    } catch (e) {
        console.error("Failed to rebalance:", e);
        Sentry.captureException(e);
    }
});

process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Stopping cron job ...");
    task.stop();
    console.log("Cronjob stopped ...");
});
