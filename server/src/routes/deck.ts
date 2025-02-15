import express from "express";

import { Deck } from "../models/DeckModel";
import {
  createDeck,
  deleteDeck,
  getDeck,
  updateDeck,
} from "../controllers/DeckControllers";
import { cardRoutes } from "./card";

export const deckRoutes = express.Router();

deckRoutes.post("/", createDeck);
deckRoutes.get("/:deckId", getDeck);
deckRoutes.patch("/:deckId", updateDeck);
deckRoutes.delete("/:deckId", deleteDeck);

deckRoutes.use("/:deckId/card", cardRoutes);
