import { Request, Response } from "express";
import { deleteWifiService, getWifiByIdService, getWifiService, postWifiService } from "../services/wifiService.js";

export async function PostWifiController(req: Request, res: Response) {
    const { routerName, title, password, description } = req.body

    const userLocals: number = res.locals.user

    const wifiInfos = {
        title,
        routerName,
        password,
        description,
        userId: userLocals
    }

    await postWifiService(wifiInfos)

    return res.status(201).send("created")
}

export async function GetWifiController(req: Request, res: Response) {
    const userLocals: number = res.locals.user
    const wifi = await getWifiService(Number(userLocals))
    return res.status(200).send(wifi)
}

export async function GetWifiByIdController(req: Request, res: Response) {
    const { id } = req.params
    const userLocals: number = res.locals.user
    const wifi = await getWifiByIdService(Number(id), Number(userLocals))
    return res.status(200).send(wifi)
}

export async function DeleteWifiController(req: Request, res: Response) {
    const { id } = req.params
    const userLocals: number = res.locals.user
    await deleteWifiService(Number(id), Number(userLocals))
    return res.status(204).send("object deleted")
}