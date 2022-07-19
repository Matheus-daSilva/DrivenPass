import { deleteCredential, getAllCredentials, getByTitle, getOneCredential, postCredential } from "../repositories/credentialsRepository.js";
import Cryptr from "cryptr";
import { Credentials } from "@prisma/client";


export type CredentialsInfos = Omit<Credentials, "id" | "createdAt">


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

export async function getCredentialsService(userId: number) {
    const respo = await getAllCredentials(Number(userId))
    return respo.map((item) => {
        return {id: item.id, title: item.title}
    })
}

export async function getCredentialByIdService(id: number, userId: number) {
    const respo = await getOneCredential(id)

    if (!respo) throw {type: "not_found", message: "this object does not exist"}
    if (respo.userId !== userId) throw {type: "unauthorized", message: "you can not acess this file"}

    const cryptr = new Cryptr(process.env.SECRET_KEY)

    const decode = cryptr.decrypt(respo.password)

    const card = {
        id: respo.id,
        title: respo.title,
        username: respo.username,
        url: respo.url,
        password: decode,
        createdAt: respo.createdAt,
        userId: respo.userId
    }

    return card
}

export async function deleteCredentialService(id: number, userId: number) {
    const respo = await getOneCredential(id)
    if (!respo) throw {type: "not_found", message: "this object does not exist"}
    if (respo.userId !== userId) throw {type: "unauthorized", message: "unauthorized"}
    return await deleteCredential(id)
}

