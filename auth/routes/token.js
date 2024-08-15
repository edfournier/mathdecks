import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import keys from "../utils/key-loader.js";
import { bodyHasCredentials } from "../middleware/validators.js";
import { handleValidationError } from "mathdecks-common/error";
import { withAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", bodyHasCredentials, handleValidationError, async (req, res, next) => {
    try {
        // Fetch and verify user
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.comparePassword(req.body.password)) {
            return res.status(403).json({ error: "Incorrect password" });
        };
    
        // Construct and sign new JWT
        const payload = { 
            id: user.id,
            username: user.username, 
            iss: "mathdecks-auth" 
        };
        const token = jwt.sign(payload, keys.private, {
            header: { kid: keys.kid },
            algorithm: "RS256",
            expiresIn: "8h"
        });
        res.status(200).json({ token });
    }
    catch (err) {
        next(err);
    }
});

router.get("/validate", withAuth, (req, res) => {
    res.sendStatus(200);
});

export default router;