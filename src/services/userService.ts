import { getUserByEmail, insertUser, openSession } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export interface User {
    email: string;
    password: string;
}

async function getEmailFunction(email: string) {
    const respo = await getUserByEmail(email)
    return respo
}

export async function signUpService(userInfo: User) {
    const emailChecking = await getEmailFunction(userInfo.email)
    if (emailChecking) throw { type: "conflict", message: "this email adress has already exist" }
    await insertUser(userInfo)
}

export async function signInService(userInfo: User) {
    const emailChecking = await getEmailFunction(userInfo.email)
    let token = ""

    if (!emailChecking.email || !bcrypt.compareSync(userInfo.password, emailChecking.password)) {
        throw { type: "invalid_credentials", message: "invalid credentials" }
    }


    await openSession(token)

    return { email: emailChecking.email, password: emailChecking.password, token }

}