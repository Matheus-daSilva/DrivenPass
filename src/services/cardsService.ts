import Cryptr from "cryptr";
import { CardBody, deleteCard, getAllCards, getOneCard, postCard } from "../repositories/cardsRepository.js";


export async function postCardService(userId: number, cardInfo: CardBody) {
    const cryptr = new Cryptr(process.env.SECRET_KEY)

    const passwordHash = cryptr.encrypt(cardInfo.password)
    const cvv = cryptr.encrypt(cardInfo.securityCode)

    const cardData = {
        number: cardInfo.number,
        title: cardInfo.title,
        description: cardInfo.description,
        cardName: cardInfo.cardName,
        securityCode: cvv,
        expirationDate: cardInfo.expirationDate,
        password: passwordHash,
        isVirtual: cardInfo.isVirtual,
        type: cardInfo.type,
        userId: Number(userId)
    }

    return await postCard(cardData)
}

export async function getCardsService(userId: number) {
    const respo = await getAllCards(userId)
    const cryptr = new Cryptr(process.env.SECRET_KEY)

    return respo.map((item) => {
        let pssDecoded = cryptr.decrypt(item.password)
        let cvvDecoded = cryptr.decrypt(item.securityCode)
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            cardName: item.cardName,
            securityCode: cvvDecoded,
            expirationDate: item.expirationDate,
            password: pssDecoded,
            isVirtual: item.isVirtual,
            type: item.type
    }})
}

export async function getCardByIdService(id: number, userId: number) {
    const respo = await getOneCard(id)

    if (!respo) throw {type: "not_found", message: "This object does not exist" }
    if (respo.userId !== userId) throw {type: "unauthorized", message: "you can not acess this file"}

    const cryptr = new Cryptr(process.env.SECRET_KEY)

    let pssDecoded = cryptr.decrypt(respo.password)
    let cvvDecoded = cryptr.decrypt(respo.securityCode)
    return {
        id: respo.id,
        title: respo.title,
        description: respo.description,
        cardName: respo.cardName,
        securityCode: cvvDecoded,
        expirationDate: respo.expirationDate,
        password: pssDecoded,
        isVirtual: respo.isVirtual,
        type: respo.type
    }
}

export async function deleteCardService(id: number, userId: number) {
    const respo = await getOneCard(id)
    if (!respo) throw {type: "not_found", message: "This object does not exist" }
    if (respo.userId !== userId) throw {type: "unauthorized", message: "you can not acess this file"}
    return await deleteCard(id)
} 