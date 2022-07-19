import { getUserByEmail, insertUser, openSession } from "../repositories/userRepository.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { User } from "@prisma/client"

export type InfoUser = Omit<User, "id" | "createdAt">

export async function getEmailFunction(email: string) {
    const respo = await getUserByEmail(email)
    return respo
}

export async function signUpService(userInfo: InfoUser) {
    const emailChecking = await getEmailFunction(userInfo.email)
    if (emailChecking) throw { type: "conflict", message: "this email adress has already exist" }
    await insertUser(userInfo)
}

export async function signInService(userInfo: InfoUser) {
    console.log(userInfo)
    const emailChecking = await getEmailFunction(userInfo.email)
    const secretKey = process.env.JWT_KEY
    const token = jwt.sign(userInfo.email, secretKey)


    const sessionsInfo = {
        token,
        userId: Number(emailChecking.id),
    }


    if (!emailChecking.email || !bcrypt.compareSync(userInfo.password, emailChecking.password)) {
        throw { type: "invalid_credentials", message: "invalid credentials" }
    }

    await openSession(sessionsInfo)

    return { 
        email: emailChecking.email, 
        password: emailChecking.password, 
        userId: emailChecking.id, 
        token 
    }

}