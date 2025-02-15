import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  // deck: { type: mongoose.Types.ObjectId, ref: "Deck", required: true },
  languageFrom: { type: String, required: true },
  front: {
    value: { type: String, required: true },
  },
  back: {
    valueType: { type: String, required: true },
    value: { type: String, required: true },
    example: { type: String, required: true },
    notes: { type: String, required: false },
  },
  tags: { type: [String], required: false },
  difficulty: { type: Number, required: false },
});

export const Card = mongoose.model("Card", cardSchema);
