import jwt from "jsonwebtoken";

const keys = {};

/**
 * Route-level middleware that verifies JWTs issued by the auth service and stored on the request header
 */
export async function withAuth(req, res, next) {
    try {
        // Parse token from header
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Authorization header missing" });
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Bearer token missing" });
        }

        // Decode claims and extract key ID
        const kid = jwt.decode(token, { complete: true })?.header?.kid;
        if (!kid) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Use cache or get latest public key from auth server
        if (keys[kid] === undefined) {
            const response = await fetch(`${process.env.AUTH_SERVICE_URL}/keys/public`);
            if (!response.ok) {
                throw new Error("Bad response from auth service");
            }

            const json = await response.json();
            if (json.kid !== kid) {
                return res.status(401).json({ error: "Invalid token" });
            }

            keys[kid] = json.public;
        }

        // Verify token
        try {
            req.user = jwt.verify(token, keys[kid], { algorithm: "RS256" });
        }
        catch {
            return res.status(401).json({ error: "Invalid token" });
        }
        next(); 
    }
    catch (err) {
        next(err);
    }
};