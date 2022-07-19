import { Sessions } from "@prisma/client";
import client from "../config/db.js";
import { InfoUser } from "../services/userService.js";

type OpenSession = Omit<Sessions, "id" | "createdAt">;

export function getUserByEmail(email: string) {
    const respo = client.user.findFirst({
        where: {email}
    })
    return respo
}

export async function insertUser(userInfo: InfoUser) {
   return await client.user.create({
        data: userInfo
    })
}

export async function openSession(sessionsInfo: OpenSession) {
    return await client.sessions.create({
        data: sessionsInfo
    })
}

export async function getSession(token: string) {
    return await client.sessions.findFirst({
        where: {token}
    })
}
