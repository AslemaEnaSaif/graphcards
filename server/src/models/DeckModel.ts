import mongoose from "mongoose";

const Schema = mongoose.Schema;

const deckSchema = new Schema({
  name: { type: String, required: true },
  languageFrom: String,
  languageTo: String,
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

export const Deck = mongoose.model("Deck", deckSchema);
