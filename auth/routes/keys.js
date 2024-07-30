import express from "express";
import keys from "../utils/key-loader.js";

const router = express.Router();

router.get("/public", (req, res) => {
    try {
        res.status(200).json({ kid: keys.kid, public: keys.public });
    }
    catch (err) {
        next(err);
    }
});

export default router;