import client from "../config/db"
import { NoteBody } from "../services/notesService"


export function getNoteByTitle(title: string) {
    const respo = client.notes.findMany({
        where: {title}
    })
    return respo
}

export async function postNote(notesInfo: NoteBody) {
   return await client.notes.create({
    data: notesInfo
   })
}

export async function getAllNotes(userId: number) {
    return await client.notes.findMany({
        where: {userId}
    })
}

export async function getOneNote(id: number) {
    return await client.notes.findUnique({
        where: {id}
    })
}

export async function deleteNote(id: number) {
    return await client.notes.delete({
        where: {id}
    })
}