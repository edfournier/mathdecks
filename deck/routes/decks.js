import express from "express";
import Deck from "../models/deck.js";
import { withAuth } from "mathdecks-common/auth";
import { bodyHasDeck } from "../middleware/validators.js";
import { handleValidationError } from "mathdecks-common/error";

const router = express.Router();

router.get("/all", withAuth, async (req, res, next) => {
    try {
        // Find all decks tied to the user
        const decks = await Deck.find({ userId: req.user.id })
        res.status(200).json(
            decks.map(deck => deck.toObject())
        );
    }
    catch (err) {
        next(err);
    }
});

router.get("/:id", withAuth, async (req, res, next) => {
    try {
        const deck = await Deck.findById(req.params.id);
        if (!deck) {
            return res.status(404).json({ error: "Deck not found" });
        }

        // Return deck if public or if it belongs to the user
        if (deck.public || deck.userId === req.user.id) {
            return res.status(200).json(deck.toObject());
        }
        return res.status(403).json({ message: "Unauthorized" });

    }
    catch (err) {
        next(err);
    }
});

router.post("/", bodyHasDeck, handleValidationError, withAuth, async (req, res, next) => {
    try {
        // Save given deck under user
        const deck = new Deck({ 
            userId: req.user.id,
            ...req.body
        });
        await deck.save();
        res.status(200).json(deck.toObject());
    }
    catch (err) {
        next(err);
    }
});

router.put("/:id", bodyHasDeck, handleValidationError, withAuth, async (req, res, next) => {
    try {
        // Find and overwrite deck
        const deck = await Deck.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { userId: req.user.id, ...req.body }, 
            { new: true }
        );
        if (!deck) {
            return res.status(404).json({ error: "Deck not found" });
        }
        res.status(200).json(deck.toObject());
    }
    catch (err) {
        next(err);
    }
});

router.delete("/:id", withAuth, async (req, res, next) => {
    try {
        // Find and delete deck belonging to user
        const result = await Deck.deleteOne({ 
            _id: req.params.id,
            userId: req.user.id
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Deck not found" });
        }
        res.status(200).json({ message: "Deck deleted" });
    }
    catch (err) {
        next(err);
    }
});

export default router;