import express from "express";
import User from "../models/user.js";
import { bodyHasCredentials } from "../middleware/validators.js";
import { withAuth } from "../middleware/auth.js";
import { handleValidationError } from "mathdecks-common/error";

const router = express.Router();

router.post("/", bodyHasCredentials, handleValidationError, async (req, res, next) => {
    try {
        // Prevent duplicate usernames
        if (await User.findOne({ username: req.body.username })) {
            return res.status(400).json({ error: "Username already registered" });
        }
        const user = new User({ 
            username: req.body.username, 
            password: req.body.password
        });
        await user.save();
        res.status(200).json({ id: user._id, username: user.username });
    }
    catch (err) {
        next(err);
    }
});

router.get("/self", withAuth, async (req, res, next) => {
    try {
        // Get the currently logged in user
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        res.status(200).json({ id: user._id, username: user.username });
    }
    catch (err) {
        next(err);
    }
});

router.delete("/", withAuth, async (req, res, next) => {
    try {
        const result = await User.deleteOne({ _id: req.user.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Publish "delete-user" event to event bus
        fetch(`${process.env.EVENT_BUS_SERVICE_URL}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "delete-user",
                data: {
                    userId: req.user.id
                }
            })
        }); 

        res.status(200).send({ message: "OK" });
    }
    catch (err) {
        next(err);
    }
});

export default router;