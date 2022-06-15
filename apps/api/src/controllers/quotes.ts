import { Request, Response } from "express";

/**
 * GetQuotes return the best quotes for exchanging tokenIn for tokenOut
 */
async function GetQuotes(req: Request, res: Response) {
    // TODO(pyk): Perform data validation and sanitization here
    return res.send({ message: "OK" });
}

export default { GetQuotes };
