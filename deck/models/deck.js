import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
    { front: String, back: String }, 
    { _id: false }
);

const deckSchema = new mongoose.Schema({
    userId: String,
    name: String,
    public: Boolean,
    cards: [cardSchema]
});

// Disables deck.__v, maps deck._id to deck.id, and removes deck._id
deckSchema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;  
    }
});
  
const Deck = mongoose.model("Deck", deckSchema);

export default Deck;