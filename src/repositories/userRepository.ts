import { Sessions } from "@prisma/client";
import client from "../config/db";
import { User } from "../services/userService";

type OpenSession = Omit<Sessions, "id">;

export function getUserByEmail(email: string) {
    const respo = client.user.findUnique({
        where: {email}
    })
    return respo
}

export async function insertUser(userInfo: User) {
   return await client.user.create({
        data: userInfo
    })
}

export async function openSession(sessionsInfo: OpenSession) {
    return await client.sessions.create({
        data: sessionsInfo
    })
}