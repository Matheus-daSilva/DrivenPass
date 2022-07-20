import { Request, Response } from "express";
import { deleteCardService, getCardByIdService, getCardsService, postCardService } from "../services/cardsService.js";

export async function PostCardController(req: Request, res: Response) {
    const { body } = req

    const userLocals: number = res.locals.user

    await postCardService(Number(userLocals), body)
    return res.status(201).send("created")
}

export async function GetCardsController(req: Request, res: Response) {
    const userLocals: number = res.locals.user
    const cards = await getCardsService(Number(userLocals))
    return res.status(200).send(cards)
}

export async function GetCardByIdController(req: Request, res: Response) {
    const { id } = req.params
    const userLocals: number = res.locals.user
    const card = await getCardByIdService(Number(id), Number(userLocals))
    return res.status(200).send(card)
}

export async function DeleteCardController(req: Request, res: Response) {
    const { id } = req.params
    const userLocals: number = res.locals.user
    await deleteCardService(Number(id), Number(userLocals))
    return res.status(204).send("object deleted")
}