import { Request, Response } from "express";
import { insertUser } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import { signInService } from "../services/userService.js";

export async function SignUpController(req: Request, res: Response){
    const {email, password} : {email: string, password: string}= req.body

    const passwordHash = bcrypt.hashSync(password, 10)

    const userInfo = {
        email,
        password: passwordHash
    }

    await insertUser(userInfo)

    return res.sendStatus(201)
}

export async function SignInController(req: Request, res: Response) {
    const {email, password} : {email: string, password: string}= req.body
    const respo = await signInService({email, password})
    const userLocals = {
        email: respo.email,
        userId: respo.userId
    }
    res.locals.user = userLocals
    return res.status(201).send(respo)
}