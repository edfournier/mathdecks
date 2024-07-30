import keys from "../utils/key-loader.js";
import jwt from "jsonwebtoken";

/**
 * Verifies JWT defined on req.body.token and sets req.user to the payload if valid
 * TODO: check kid const decoded = jwt.decode(token, { complete: true })
 */
export function withAuth(req, res, next) {
    try {
        if (!req.body.token) {
            return res.status(401).json({ error: "Token required" });
        }
        req.user = jwt.verify(req.body.token, keys.public, {  algorithm: "RS256" });
        next();
    }
    catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
}