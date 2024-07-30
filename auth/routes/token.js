import express from "express";

const router = express.Router();

function tokenTest() {
    const payload = {
        username: "edfournier"
    };

    const token = jwt.sign(payload, pair.private, {
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
        jwt.verify(token, pair.public, { algorithm: "RS256" });
    } 
    catch (err) {
        console.error("Invalid token:", err.message);
    }
}

router.post("/", (req, res) => {
    // compares username and hashed password against db
    // if good, return JWT
});

export default router;