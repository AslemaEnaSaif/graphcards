import express from "express";

import {
  createCard,
  deleteCard,
  getCard,
  getCards,
  updateCard,
} from "../controllers/CardControllers";

// "/api/deck/:deckId/card"
// export const cardRoutes = express.Router({ mergeParams: true });
// to allow the cards router to access the parent routers params
export const cardRoutes = express.Router();

cardRoutes.post("/", createCard);
cardRoutes.get("/", getCards);
cardRoutes.get("/:cardId", getCard);
cardRoutes.delete("/:cardId", deleteCard);
cardRoutes.put("/:cardId", updateCard);
