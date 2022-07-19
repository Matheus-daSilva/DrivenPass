import express from "express"
import { DeleteNoteController, GetNoteByIdController, GetNotesController, PostNotesController } from "../controllers/notesController.js"
import { notesMiddleware } from "../middlewares/notesMiddleware.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"

const notesRoute = express.Router()

notesRoute.post("/notes", tokenValidation, notesMiddleware, PostNotesController)
notesRoute.get("/notes", tokenValidation, GetNotesController)
notesRoute.get("/notes/:id", tokenValidation, GetNoteByIdController)
notesRoute.delete("/notes/:id", tokenValidation, DeleteNoteController)

export default notesRoute