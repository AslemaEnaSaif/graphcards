import { Request, Response } from "express";
import { Deck } from "../models/DeckModel";
import mongoose from "mongoose";

export async function createDeck(
  request: Request,
  response: Response
): Promise<Response> {
  const { name, languageFrom, languageTo } = request.body;

  try {
    const deck = await Deck.create({ name, languageFrom, languageTo });
    return response.status(200).json(deck);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
}

export async function getDeck(
  request: Request,
  response: Response
): Promise<Response> {
  const { deckId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    return response.status(404).json({ error: "no such deck" });
  }

  const deck = await Deck.findById(deckId);
  if (!deck) {
    return response.status(404).json({ error: "no such deck" });
  }
  return response.status(200).json(deck);
}

export async function updateDeck(
  request: Request,
  response: Response
): Promise<Response> {
  const deckId = request.params.deckId;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    return response.status(404).json({ error: "no such deck" });
  }

  const deck = await Deck.findOneAndUpdate(
    {
      _id: deckId,
    },
    { ...request.body }
  );

  if (!deck) {
    return response.status(404).json({ error: "no such deck" });
  }

  return response.status(200).json(deck);
}

export async function deleteDeck(
  request: Request,
  response: Response
): Promise<Response> {
  const deckId = request.params.deckId;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    return response.status(404).json({ error: "no such deck" });
  }

  const deck = await Deck.findOneAndDelete({
    _id: deckId,
  });

  if (!deck) {
    return response.status(404).json({ error: "no such deck" });
  }

  return response.status(200).json(deck);
}
