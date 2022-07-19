import { Notes } from "@prisma/client";
import { deleteNote, getAllNotes, getNoteByTitle, getOneNote, postNote } from "../repositories/notesRepository.js";

export type NoteBody = Omit<Notes, "id" | "createdAt">

async function getNoteTitle(title: string) {
    const respo = await getNoteByTitle(title)
    return respo
}

export async function postNoteService(notesInfo: NoteBody) {
    const respo = await getNoteTitle(notesInfo.title)

    if (respo) throw {type: "conflict", message: "This note has already exist"}

    return await postNote(notesInfo)
}

export async function getNotesService(userId: number) {
    const respo = await getAllNotes(userId)
    return respo.map((item) => {
        return {id: item.id, title: item.title, text: item.text}
    })
}

export async function getNoteByIdService(id: number) {
    const respo = await getOneNote(id)
    if (!respo) throw {type: "not_found", message: "this object does not exist"}
    return respo
}

export async function deleteNoteService(id: number, userId: number) {
    const respo = await getOneNote(id)

    if (!respo) throw {type: "not_found", message: "this object does not exist"}
    if (respo.userId !== userId) throw {type: "unauthorized", message: "unauthorized"}

    await deleteNote(id)

}