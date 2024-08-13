import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import keys from "../utils/key-loader.js";
import { checkCredentials } from "../middleware/validators.js";
import { handleValidationError } from "mathdecks-common/error";

const router = express.Router();

router.post("/", checkCredentials, handleValidationError, async (req, res, next) => {
    try {
        // Fetch and verify user
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.sendStatus(404);
        }
        if (!user.comparePassword(req.body.password)) {
            return res.sendStatus(403);
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

export default router;