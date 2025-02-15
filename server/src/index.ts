import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { cardRoutes } from "./routes/card";
import mongoose from "mongoose";
import { deckRoutes } from "./routes/deck";
import cors from "cors";

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// ROUTES
app.use("/api/card", cardRoutes);

//CONNECT TO DB
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      // LISTEN
      app.listen(process.env.PORT, () => {
        console.log(
          `connected to DB & Server is running on http://localhost:${process.env.PORT}`
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
