import express from "express"
import { GetNoteByIdController, GetNotesController, PostNotesController } from "../controllers/notesController.js"
import { notesMiddleware } from "../middlewares/notesMiddleware.js"

const notesRoute = express.Router()

notesRoute.post("/notes", notesMiddleware, PostNotesController)
notesRoute.get("/notes", GetNotesController)
notesRoute.get("/notes/:id", GetNoteByIdController)