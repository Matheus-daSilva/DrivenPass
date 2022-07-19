import client from "../config/db.js";
import { CredentialsInfos } from "../services/credentialsService.js";


export function getByTitle(title: string){
    const respo = client.credentials.findFirst({
        where: {title}
    })
    return respo
}

export async function postCredential(credentialInfo: CredentialsInfos){
    return await client.credentials.create({
        data: credentialInfo
    })
}

export async function getAllCredentials(userId: number) {
    return await client.credentials.findMany({
        where: {userId}
    })
}

export async function getOneCredential(id: number) {
    return await client.credentials.findUnique({
        where: {id}
    })
}

export async function deleteCredential(id: number) {
    return await client.credentials.delete({
        where: {id}
    })
}