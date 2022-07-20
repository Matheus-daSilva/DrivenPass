import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { getSession } from "../repositories/userRepository.js";

export async function tokenValidation(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization
    if (!token) throw {type: "no_token", message: "no token provided"}
    token = token.replace("Bearer ", "")

    const decode = jwt.verify(token, process.env.JWT_KEY)

    if(!decode) throw {type: "unauthorized", message: "invalid token"}

    const user = await getSession(token)

    res.locals.user = user.userId

    next()
}