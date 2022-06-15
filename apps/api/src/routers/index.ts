import express from "express";
import quotes from "../controllers/quotes";

const router = express.Router();

router.get("/quotes", quotes.GetQuotes);

export { router };
