import express from "express";
import jwt from "jsonwebtoken";
import { keys } from "./keys.js";

const router = express.Router();

router.post("/", (req, res) => {
    // Compare user and hashed pass against db
    req.body = {
        user: "user",
        pass: "pass"
    }

    // Create payload
    const payload = {
        user: req.body.user,
        iss: "mathdecks-auth"
    }

    // Sign JWT
    const token = jwt.sign(payload, keys.private, {
        expiresIn: "4h", 
        algorithm: "RS256",
        header: { 
            kid: keys.kid 
        }
    });
    
    res.status(200).json({ token });
});

export default router;