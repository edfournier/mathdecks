import express from "express";
import { eventHandler } from "../utils/event.js";
import Record from "../models/record.js";
import logger from "../utils/logger.js";

const router = express.Router();

router.post("/", eventHandler({
    "delete-user": async (data) => {
        const result = await Record.deleteMany({ userId: data.userId });
        logger.info(`Deleted ${result.deletedCount} records under user ${data.userId}`);
    }
}));

export default router;