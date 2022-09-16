import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Import routers
import { router } from "./routers/index";

// Create and setup express app
const server: Express = express();

// Setup JSON parser
server.use(express.json());

// Setup logging
server.use(morgan("combined"));

// Setup CORS
server.use(
    cors({
        origin: [
            "https://risedle.com",
            "https://bsc.risedle.com",
            "https://risedle.exchange",
            "https://risedle.trade",
            "http://localhost:6006",
            "http://localhost:3000",
            /.frontend-3mt\.pages\.dev$/,
            /risedle\.vercel\.app$/,
        ],
    })
);

// Install routers
server.use("/v1", router);

// Health checks
server.get("/health", async function (req, res) {
    return res.send({ message: "OK" });
});

// Serve OpenAPI viewer
const swaggerDocument = YAML.load("openapi.yml");
server.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default server;
