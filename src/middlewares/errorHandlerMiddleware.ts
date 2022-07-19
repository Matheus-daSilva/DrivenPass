import { Response, Request, NextFunction} from "express";

interface CustomErrors{
    type: string;
    message: string;
}

export async function errorHandler(error: CustomErrors, req: Request, res: Response, next: NextFunction) {
    console.log(`error on errorHandler, ${error}`);
    if (error.type === "not_found" || error.type === "invalid_credentials") {
        return res.status(404).send(error.message)
    }

    if (error.type === "invalid_inputs" || error.type === "unauthorized") {
        return res.status(422).send(error.message)
    }

    if (error.type === "no_token") {
        return res.status(401).send(error.message)
    }

    if (error.type === "conflict") {
        return res.status(409).send(error.message)
    }

    res.status(500).send("Internal server error")
}