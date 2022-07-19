import express from "express";
import { SignInController, SignUpController } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRoute = express.Router()

authRoute.post("/sign-up", authMiddleware, SignUpController)
authRoute.post("/sign-in", SignInController)

export default authRoute