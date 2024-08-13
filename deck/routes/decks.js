import express from "express";
import Deck from "../models/deck.js";
import { withAuth } from "mathdecks-common/auth"

const router = express.Router();

router.get("/all", withAuth, async (req, res, next) => {
    try {
        // Find all decks tied to the user
        const decks = await Deck.find({ userId: req.user.id })
        res.status(200).json({ decks });
    }
    catch (err) {
        next(err);
    }
});

router.get("/:id", withAuth, async (req, res, next) => {
    try {
        // Find specific deck belonging to user
        const deck = await Deck.findOne({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!deck) {
            return res.status(404).json({ error: "Deck not found" });
        }
        res.status(200).json(deck);
    }
    catch (err) {
        next(err);
    }
});

router.post("/", withAuth, async (req, res, next) => {
    try {
        // Save given deck under user
        const deck = new Deck({ 
            userId: req.user.id,
            ...req.body
        });
        await deck.save();
        res.status(200).json({ ...deck.toObject() });
    }
    catch (err) {
        next(err);
    }
});

router.put("/:id", withAuth, async (req, res, next) => {
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
        res.status(200).json({ ...deck.toObject() });
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
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});

export default router;