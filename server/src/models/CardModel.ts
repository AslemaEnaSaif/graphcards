import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    // deck: { type: mongoose.Types.ObjectId, ref: "Deck", required: true },
    // languageFrom: { type: String, required: true },
    cardType: { type: String, required: true },
    front: {
      value: { type: String, required: true },
    },
    back: {
      value: { type: String, required: true },
      example: { type: String, required: true },
      notes: { type: String, required: false },
    },
    groups: { type: [String], required: false },
    links: {
      type: [{ linkedCardId: mongoose.Types.ObjectId, label: String }],
      ref: "Card",
      required: false,
    },
    // difficulty: { type: Number, required: false },
  },
  { strict: false }
);

export const Card = mongoose.model("Card", cardSchema);
