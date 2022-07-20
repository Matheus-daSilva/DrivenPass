import { Request, Response } from "express";
import { deleteCredentialService, getCredentialByIdService, getCredentialsService, postCredentialService } from "../services/credentialsService.js";

export async function PostCredentialsController(req: Request, res: Response) {
    const { title, username, url, password } = req.body

    const userLocals: number = res.locals.user

    const credentialInfo = {
        title,
        username,
        url,
        password,
        userId: userLocals
    }
    await postCredentialService(credentialInfo)
    return res.sendStatus(201)
}

export async function GetCredentialsController(req: Request, res: Response) {
    const userLocals: number = res.locals.user
    const credentials = await getCredentialsService(Number(userLocals))
    return res.status(200).send(credentials)
}

export async function GetCredentialsByIdController(req: Request, res: Response) {
    const { id } = req.params
    const userLocals: number = res.locals.user
    const getCredential = await getCredentialByIdService(Number(id), Number(userLocals))
    return res.status(200).send(getCredential)
}

export async function DeleteCredentialController(req: Request, res: Response) {
    const { id } = req.params
    const userLocals: number = res.locals.user

    await deleteCredentialService(Number(id), Number(userLocals))

    return res.status(204).send("Object deleted")
}