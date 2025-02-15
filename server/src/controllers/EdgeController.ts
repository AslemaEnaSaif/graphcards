import { Request, Response } from "express";
import { Card } from "../models/CardModel";
import { Deck } from "../models/DeckModel";
import mongoose from "mongoose";
import { Edge } from "../models/EdgeModel";

export async function createEdge(request: Request, response: Response) {
  const { from, to, label } = request.body;

  try {
    const edge = await Edge.create({
      from,
      to,
      label,
    });

    return response.status(200).json(edge);
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
}

export async function getEdges(request: Request, response: Response) {
  const edges = await Edge.find();

  if (!edges) {
    return response.status(404).json({ error: "there are no edges" });
  }

  return response.status(200).json(edges);
}

export async function updateEdge(
  request: Request,
  response: Response
): Promise<Response> {
  const { edgeId } = request.body;

  if (!mongoose.Types.ObjectId.isValid(edgeId)) {
    return response.status(404).json({ error: "Card Id not valid" });
  }

  const edge = await Edge.findOneAndUpdate(
    { _id: edgeId },
    { ...request.body }
  );

  if (!edge) {
    return response.status(404).json({ error: "no such edge" });
  }

  return response.status(200).json(edge);
}

export async function deleteEdge(
  request: Request,
  response: Response
): Promise<Response> {
  const { edgeId } = request.body;

  if (!mongoose.Types.ObjectId.isValid(edgeId)) {
    return response.status(404).json({ error: "edge ID not valid" });
  }

  const edge = await Edge.findOneAndDelete({ _id: edgeId });

  if (!edge) {
    return response.status(404).json({ error: "no such card" });
  }

  return response.status(200).json(edge);
}
