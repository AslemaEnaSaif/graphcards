import mongoose from "mongoose";

const Schema = mongoose.Schema;

const edgeSchema = new Schema({
  from: { type: mongoose.Types.ObjectId, required: true },
  to: { type: mongoose.Types.ObjectId, required: true },
  label: { type: String, required: true },
});

export const Edge = mongoose.model("Edge", edgeSchema);
