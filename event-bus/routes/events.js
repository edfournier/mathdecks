import express from "express";
import logger from "../utils/logger.js";
import "dotenv/config";

const router = express.Router();
const urls = [];

// Load service URLs from environment
for (let key in process.env) {
    if (key.endsWith("_SERVICE_URL")) {
        urls.push(process.env[key]);
    }
}

router.post("/", async (req, res, next) => {
    try {
        // Publish event to all subscribers
        const results = await Promise.allSettled(urls.map(url => {
            return fetch(`${url}/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body)
            });
        }));

        // Check errors
        results.forEach((result, i) => {
            if (result.status === "rejected") {
                logger.error(`Error publishing to ${urls[i]}`, result.reason);
            }
        });
        res.send({ message: "OK" });
    }
    catch (err) {
        next(err);
    }

});

export default router;