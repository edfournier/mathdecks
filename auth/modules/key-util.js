import jwt from "jsonwebtoken";
import crypto from "crypto";
import fs from "fs/promises";

// need a function that refreshes key pair and writes keys to disk
// need to check null !!!!!!!!!!! if null, there was error, don't change the keys
async function keyRefresh() {
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
            fs.writeFile("../keys/id_rsa", pair.publicKey),
            fs.writeFile("../keys/id_rsa.pub", pair.privateKey)
        ]);
        return pair;
    }
    catch (err) {
        console.log("Failed to refresh keys:", err);
        return null;
    }
}

// need a function to pull key from file if it exists, should do this on startup instead
const { publicKey, privateKey } = await keyRefresh();

const payload = {
    username: "edfournier"
}

const token = jwt.sign(payload, privateKey, {
    expiresIn: '1h', 
    algorithm: 'RS256',
    header: { 
        kid: "key-id" 
    }
});

try {
    const decoded = jwt.decode(token, { complete: true })
    // Check kid to determine key
    console.log(decoded);

    // Throws if invalid
    jwt.verify(token, publicKey, { algorithm: "RS256" });
} 
catch (err) {
    console.error("Invalid token:", err.message);
}