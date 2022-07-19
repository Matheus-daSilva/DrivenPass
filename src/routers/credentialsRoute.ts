import express from "express";
import { DeleteCredentialController, GetCredentialsByIdController, GetCredentialsController, PostCredentialsController } from "../controllers/credentialsController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const credentialRoute = express.Router()

credentialRoute.post("/credential", tokenValidation, PostCredentialsController )
credentialRoute.get("/credential", tokenValidation, GetCredentialsController)
credentialRoute.get("/credential/:id", tokenValidation, GetCredentialsByIdController)
credentialRoute.delete("/credential/:id", tokenValidation, DeleteCredentialController)

export default credentialRoute