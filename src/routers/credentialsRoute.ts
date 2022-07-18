import express from "express";
import { DeleteCredentialController, GetCredentialsByIdController, GetCredentialsController, PostCredentialsController } from "../controllers/credentialsController.js";

const credentialRoute = express.Router()

credentialRoute.post("/credential", PostCredentialsController )
credentialRoute.get("/credential", GetCredentialsController)
credentialRoute.get("/credential/:id", GetCredentialsByIdController)
credentialRoute.delete("/credential/:id", DeleteCredentialController)

export default credentialRoute