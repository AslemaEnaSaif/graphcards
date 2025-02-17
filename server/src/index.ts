import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { cardRoutes } from "./routes/card";
import mongoose from "mongoose";
import { deckRoutes } from "./routes/deck";
import cors from "cors";
import { Card } from "./models/CardModel";

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

//flip document values
// async function flip() {
//   try {
//     if (process.env.MONGO_URI) {
//       mongoose.connect(process.env.MONGO_URI).then(async () => {
//         const db = mongoose.connection.db;
//         if (!db) {
//           throw new Error("connection is not ready");
//         }
//         const collection = db.collection("cards");
//         const cards = await collection.find({}).toArray();
//         for (const oldCard of cards) {
//           console.log(oldCard);
//           console.log("----------------++++");
//           const updatedCard = {
//             ...oldCard,
//             front: {
//               value: oldCard.back?.value,
//               valueType: oldCard.back?.valueType,
//             },
//             back: {
//               ...oldCard.back,
//               value: oldCard.front.value,
//             },
//           };
//           delete updatedCard.back.valueType;

//           await collection.updateOne(
//             { _id: oldCard._id },
//             { $set: updatedCard }
//           );
//           break;
//         }
//       });
//     }
//   } catch (error) {
//     console.error("migration failed");
//   } finally {
//     mongoose.disconnect();
//   }
// }
// flip();
