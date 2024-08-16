import crypto from "crypto";
import logger from "../utils/logger.js";

/**
 * Generates a new RSA256 key pair, and writes the pair to disk
 * @returns a promise resolving to the new key pair, or null on failure
 */
export async function generateKeys() {
    try {
        const pair = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { 
                type: "spki", 
                format: "pem" 
            },
            privateKeyEncoding: { 
                type: "pkcs8", 
                format: "pem" 
            },
        });
        await Promise.all([
            fs.writeFile("./certs/id_rsa", pair.private),
            fs.writeFile("./certs/id_rsa.pub", pair.public)
        ]);
        logger.info("Generated key pair successfully");
        return pair;
    }
    catch (err) {
        logger.error("Failed to write keys:", err);
        return null;
    }
}