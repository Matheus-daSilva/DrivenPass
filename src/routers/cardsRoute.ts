import express from "express";
import { DeleteCardController, GetCardByIdController, GetCardsController, PostCardController } from "../controllers/cardController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const cardsRoute = express.Router()

cardsRoute.post("/cards", tokenValidation, PostCardController)
cardsRoute.get("/cards", tokenValidation, GetCardsController)
cardsRoute.get("/cards/:id", tokenValidation, GetCardByIdController)
cardsRoute.delete("/cards/:id", tokenValidation, DeleteCardController)

export default cardsRoute