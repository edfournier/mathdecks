import express from "express";
import Record from "../models/record.js";
import { withAuth } from "mathdecks-common/auth"

const router = express.Router();

router.get("/daily", withAuth, async (req, res, next) => {
    try {
        // Get current day/month/year, ignore hour/min/sec/ms
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        let record = await Record.findOne({ userId: req.user.id }); 
        if (!record) {
            // Create new record
            record = new Record({
                userId: req.user.id,
                streak: 1,
                tally: 1,
                stamp: now.toISOString()
            });
            await record.save();
        }
        else {
            const stamp = new Date(record.stamp);

            // Extend streak: 1 day = 86400000 ms
            if ((now - stamp) / 86400000 === 1) {
                record.streak++;
            }
            // Increment tally
            if (now > stamp) {
                record.tally++;
                record.stamp = now.toISOString();
                await record.save();
            }
        }
        res.status(200).json(record.toObject());
    }
    catch (err) {
        next(err);
    }
});

export default router;