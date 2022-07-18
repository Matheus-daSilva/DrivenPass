import client from "../config/db";
import { User } from "../services/userService";

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

export async function openSession(token: string) {
    return await client.sessions.create({
        data: {token}
    })
}