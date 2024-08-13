import keys from "../utils/key-loader.js";
import jwt from "jsonwebtoken";

/**
 * Verifies JWT defined on header and sets req.user to its payload if valid
 */
export function withAuth(req, res, next) {
    try {
        // Parse token from header
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Authorization header missing" });
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Bearer token missing" });
        }

        // Verify token
        try {
            req.user = jwt.verify(token, keys.public, { algorithm: "RS256" });
        }
        catch {
            return res.status(401).json({ error: "Invalid token" });
        }
        next(); 
    }
    catch (err) {
        next(err);
    }
}