import { Request, Response, NextFunction } from "express";
import { notesSchema } from "../schemas/notesSchema.js";

export async function notesMiddleware(req: Request, res: Response, next: NextFunction){
    const { body } = req;
    console.log(body)
    const validation = notesSchema.validate(body, { abortEarly: false });

    if (validation.error) throw {type: "invalid_inputs", message: "something got wrong with your inputs"}

    next()
}