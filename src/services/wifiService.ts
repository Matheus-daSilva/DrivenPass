import { Wifi } from "@prisma/client";
import { deleteWifi, getAllWifi, getOneWifi, postWifi } from "../repositories/wifiRepository.js";
import Cryptr from "cryptr";


export type WifiData = Omit<Wifi, "id" | "createdAt">



export async function postWifiService(wifiInfos: WifiData) {

    const cryptr = new Cryptr(process.env.SECRET_KEY)
    const passwordHash = cryptr.encrypt(wifiInfos.password)

    const wifiObject = {
        title: wifiInfos.title,
        routerName: wifiInfos.routerName,
        password: passwordHash,
        description: wifiInfos.description,
        userId: wifiInfos.userId
    }

    return await postWifi(wifiObject)

}

export async function getWifiService(userId: number) {
    const respo = await getAllWifi(userId)

    const cryptr = new Cryptr(process.env.SECRET_KEY)

    return respo.map((item) => {
        let pssDecoded = cryptr.decrypt(item.password)

        return {
            id: item.id,
            title: item.title,
            routerName: item.routerName,
            password: pssDecoded,
            description: item.description
        }
    })
}

export async function getWifiByIdService(id: number, userId: number) {
    const respo = await getOneWifi(id)

    if (!respo) throw {type: "not_found", message: "this object does not exist"}
    if (respo.userId !== userId) throw {type: "unauthorized", message: "you can not acess this file"}

    const cryptr = new Cryptr(process.env.SECRET_KEY)
    const decode = cryptr.decrypt(respo.password)

    return {
        id: respo.id,
        title: respo.title,
        routerName: respo.routerName,
        password: decode,
        description: respo.description
    }
}

export async function deleteWifiService(id: number, userId: number) {
    const respo = await getOneWifi(id)

    if (!respo) throw {type: "not_found", message: "this object does not exist"}
    if (respo.userId !== userId) throw {type: "unauthorized", message: "unauthorized"}

   return await deleteWifi(id)
}