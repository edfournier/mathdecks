import express from "express";
import User from "../models/user.js";
import { checkCredentials } from "../middleware/validators.js";
import { withAuth } from "../middleware/auth.js";
import { handleValidationError } from "mathdecks-common/error";

const router = express.Router();

router.post("/", checkCredentials, handleValidationError, async (req, res, next) => {
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
        res.status(200).json({ id: user._id, username: user.username });
    }
    catch (err) {
        next(err);
    }
});

router.delete("/:username", withAuth, async (req, res, next) => {
    try {
        // Check username matches route
        if (req.user.username !== req.params.username) {
            return res.status(403).json({ error: "User lacks access" });
        }
        const result = await User.deleteOne({ username: req.user.username });
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