import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
    { front: String, back: String, }, 
    { _id: false }
);

const deckSchema = new mongoose.Schema({
    userId: String,
    name: String,
    cards: [cardSchema]
});
  
const Deck = mongoose.model("Deck", deckSchema);

export default Deck;