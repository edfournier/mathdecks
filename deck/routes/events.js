import express from "express";
import { eventHandler } from "../utils/event.js";
import Deck from "../models/deck.js";
import logger from "../utils/logger.js";

const router = express.Router();

router.post("/", eventHandler({
    "delete-user": async (data) => {
        const result = await Deck.deleteMany({ userId: data.userId });
        logger.info(`Deleted ${result.deletedCount} decks under user ${data.userId}`);
    }
}));

export default router;