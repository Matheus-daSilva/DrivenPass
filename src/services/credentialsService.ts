import { deleteCredential, getAllCredentials, getByTitle, getOneCredential, postCredential } from "../repositories/credentialsRepository.js";
import Cryptr from "cryptr";


export interface CredentialsInfos {
    title: string;
    username: string;
    url: string;
    password: string;
    userId: number;
}

export interface Locals {
    email: string;
    userId: number;
}

export async function postCredentialService(credentialInfo: CredentialsInfos) {
    const respo = await getByTitle(credentialInfo.title)

    const cryptr = new Cryptr(process.env.SECRET_KEY)

    const passwordHash = cryptr.encrypt(credentialInfo.password)

    const credObj = {
        title: credentialInfo.title,
        username: credentialInfo.username,
        url: credentialInfo.url,
        password: passwordHash,
        userId: credentialInfo.userId
    }

    if (respo) throw {type: "conflict", message: "this credential has already exists"}

    return await postCredential(credObj)
}

export async function getCredentialsService(userInfo: Locals) {
    const respo = await getAllCredentials(Number(userInfo.userId))
    return respo.map((item) => {
        return {id: item.id, title: item.title}
    })
}

//TODO descriptografar a senha

export async function getCredentialByIdService(id: number) {
    const respo = await getOneCredential(id)
    if (!respo) throw {type: "not_found", message: "this object does not exist"}
    return respo
}

export async function deleteCredentialService(id: number, userLocals: Locals) {
    const respo = await getOneCredential(id)
    if (!respo) throw {type: "not_found", message: "this object does not exist"}
    if (respo.userId !== userLocals.userId) throw {type: "unauthorized", message: "unauthorized"}
    return await deleteCredential(id)
}

