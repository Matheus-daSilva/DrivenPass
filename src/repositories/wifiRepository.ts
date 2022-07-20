import client from "../config/db.js";
import { WifiData } from "../services/wifiService.js";

export async function postWifi(wifiInfos: WifiData) {
    return await client.wifi.create({
        data: wifiInfos
    })
}

export async function getAllWifi(userId: number) {
    return await client.wifi.findMany({
        where: {userId}
    })
}

export async function getOneWifi(id: number) {
    return await client.wifi.findUnique({
        where: {id}
    })
}

export async function deleteWifi(id: number) {
    return await client.wifi.delete({
        where: {id}
    })
}