import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import keys from "../utils/key-pair.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        // Check for duplicate
        if (await User.findOne({ username: req.body.username })) {
            return res.status(400).json({ error: "Username already registered" });
        }
        const user = new User({ 
            username: req.body.username, 
            password: req.body.password
        });
        await user.save();
        res.status(200).json({ username: user.username });
    }
    catch (err) {
        next(err);
    }
});

async function withAuth(req, res, next) {
    try {
        // TODO: check kid const decoded = jwt.decode(token, { complete: true })
        req.claims = jwt.verify(req.body.token, keys.public, { algorithm: "RS256" });
        next();
    }
    catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
}

router.delete("/:username", withAuth, async (req, res, next) => {
    try {
        const result = await User.deleteOne({ username: req.claims.username });
        if (result.deletedCount === 0) {
            return res.sendStatus(404);
        }
        res.sendStatus(200);
        // TODO: Publish "delete-user" event to event bus
    }
    catch (err) {
        next(err);
    }
});

export default router;