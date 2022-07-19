import { Cards } from "@prisma/client";
import client from "../config/db.js";

export type CardBody = Omit<Cards, "id" | "createAt">

export async function postCard(cardInfo: CardBody) {
    return await client.cards.create({
        data: cardInfo
    })
}

export async function getAllCards(userId: number){
    return await client.cards.findMany({
        where: { userId }    })
}

export async function getOneCard(id: number) {
    return await client.cards.findUnique({
        where: {id}
    })
}

export async function deleteCard(id: number) {
    return await client.cards.delete({
        where: {id}
    })
}