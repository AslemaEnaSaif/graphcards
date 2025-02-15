import { Request, Response } from "express";
import { Card } from "../models/CardModel";
import mongoose from "mongoose";
import { Edge } from "../models/EdgeModel";

export async function createCard(request: Request, response: Response) {
  const { front, back, groups, links } = request.body;

  try {
    const card = await Card.create({
      languageFrom: "Tunisian",
      front,
      back,
      groups,
      links,
    });

    if (card) {
      for (const linkedCard of card.links) {
        const edge = await Edge.create({
          from: card._id,
          to: linkedCard.linkedCardId,
          label: linkedCard.label,
        });
      }
    }
    return response.status(200).json(card);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
}

export async function getCard(request: Request, response: Response) {
  const { deckId, cardId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    return response.status(404).json({ error: "Deck Id not valid" });
  }
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return response.status(404).json({ error: "Card Id not valid" });
  }

  const card = await Card.findOne({ _id: cardId, deck: deckId });

  if (!card) {
    return response.status(404).json({ error: "no such card" });
  }
  return response.status(200).json(card);
}

export async function getCards(request: Request, response: Response) {
  // const { deckId } = request.params;

  // if (!mongoose.Types.ObjectId.isValid(deckId)) {
  //   return response.status(404).json({ error: "Deck Id not valid" });
  // }

  const cards = await Card.find();

  if (!cards) {
    return response.status(404).json({ error: "there are no cards" });
  }

  return response.status(200).json(cards);
}

export async function updateCard(
  request: Request,
  response: Response
): Promise<Response> {
  const { cardId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return response.status(404).json({ error: "Card Id not valid" });
  }

  const card = await Card.findOneAndUpdate(
    { _id: cardId },
    { ...request.body }
  );

  if (!card) {
    return response.status(404).json({ error: "no such card" });
  }

  return response.status(200).json(card);
}

export async function deleteCard(
  request: Request,
  response: Response
): Promise<Response> {
  const { cardId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return response.status(404).json({ error: "Card Id not valid" });
  }

  const card = await Card.findOneAndDelete({ _id: cardId });

  if (!card) {
    return response.status(404).json({ error: "no such card" });
  }

  return response.status(200).json(card);
}
