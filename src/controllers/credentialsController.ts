import { Request, Response } from "express";
import { deleteCredentialService, getCredentialByIdService, getCredentialsService, postCredentialService } from "../services/credentialsService";

export async function PostCredentialsController(req: Request, res: Response){
    const { title, username, url, password } = req.body

    const userLocals = res.locals.user

    const credentialInfo = {
        title,
        username,
        url,
        password,
        userId: userLocals.userId
    }
    await postCredentialService(credentialInfo)
    return res.status(201)
}

export async function GetCredentialsController(req: Request, res: Response) {
    const userLocals = res.locals.user
    const credentials = await getCredentialsService(userLocals)
    res.status(200).send(credentials)
}

export async function GetCredentialsByIdController(req: Request, res: Response) {
    const { id } = req.params
    const getCredential = await getCredentialByIdService(Number(id))
    res.status(200).send(getCredential)
}

export async function DeleteCredentialController(req: Request, res: Response) {
    const { id } = req.params
    const userLocals = res.locals.user

    const deleteCredential = await deleteCredentialService(Number(id), userLocals)

    res.status(204).send("Object deleted")
}