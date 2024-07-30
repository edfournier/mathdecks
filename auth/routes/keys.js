import express from "express";
import fs from "fs/promises";
import crypto from "crypto";

export const keys = {};
const router = express.Router();

try {
    // Load keys from disk
    [keys.public, keys.private] = await Promise.all([
        fs.readFile("./certs/id_rsa.pub", "utf-8"),
        fs.readFile("./certs/id_rsa", "utf-8"), 
    ]);

    // Hash public key to generate key ID 
    keys.kid = crypto
        .createHash("sha256")
        .update(keys.public)
        .digest()
        .toString("base64url");
}   
catch(err) {
    throw new Error(`Failed to read keys. Check 'certs' directory.\n${err}`);
}

router.get("/public", (req, res) => {
    try {
        res.status(200).json({ kid: keys.kid, public: keys.public });
    }
    catch (err) {
        next(err);
    }
});

export default router;