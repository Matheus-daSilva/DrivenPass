import { Request, Response } from "express";
import { deleteNoteService, getNoteByIdService, getNotesService, postNoteService } from "../services/notesService.js";

export async function PostNotesController(req: Request, res: Response) {
    const { title, text } = req.body

    const userLocals = res.locals.user

    console.log(userLocals)

    const notesInfo = {
        title,
        text,
        userId: userLocals.userId
    }

    const respo = await postNoteService(notesInfo)
    return res.status(201).send("Note created")
}

export async function GetNotesController(req: Request, res: Response) {
    const userLocals = res.locals.user
    const respo = await getNotesService(Number(userLocals.userId))
    return res.status(200).send(respo)
}

export async function GetNoteByIdController(req: Request, res: Response) {
    const { id } = req.params
    const respo = await getNoteByIdService(Number(id))
    return res.status(200).send(respo)
}

export async function DeleteNoteController(req: Request, res: Response) {
    const { id } = req.params
    const userLocals = res.locals.user
    const respo = await deleteNoteService(Number(id), Number(userLocals.userId))
    return res.status(204).send("object deleted")
}
