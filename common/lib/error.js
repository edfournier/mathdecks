import logger from "./logger.js";

export function errorHandler(err, req, res, next) {
    logger.error(`Process ${process.pid} encountered an error:`, err);
    if (req.headersSent) {
        next(err);
    }
    else {
        res.status(500).json({ error: "Internal Server Error" });
    }
}   