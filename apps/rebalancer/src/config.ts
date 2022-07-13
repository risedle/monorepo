import dotenv from "dotenv";

// Load .env file
dotenv.config();

export const RPC_URL = process.env.RPC_URL!;
export const FLTS = process.env.FLTS!.split(",");
export const MIN_PROFITS = process.env.MIN_PROFITS!.split(",");
export const WALLET_PK = process.env.WALLET_PK!;
