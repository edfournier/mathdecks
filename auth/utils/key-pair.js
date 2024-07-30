import fs from "fs/promises";
import crypto from "crypto";

const keys = {};

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

export default keys;