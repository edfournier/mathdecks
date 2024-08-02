import logger from "./logger.js";
import { validationResult } from "express-validator";

export function errorHandler(err, req, res, next) {
    logger.error(`Process ${process.pid} encountered an error:`, err);
    if (req.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: "Internal Server Error" });
}   

export function handleValidationError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }
    next();
}