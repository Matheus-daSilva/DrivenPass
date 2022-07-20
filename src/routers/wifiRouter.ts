import express from "express"
import { DeleteWifiController, GetWifiByIdController, GetWifiController, PostWifiController } from "../controllers/wifiController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const wifiRouter = express.Router()

wifiRouter.post("/wifi", tokenValidation, PostWifiController)
wifiRouter.get("/wifi", tokenValidation, GetWifiController)
wifiRouter.get("/wifi/:id", tokenValidation, GetWifiByIdController)
wifiRouter.delete("/wifi/:id", tokenValidation, DeleteWifiController)

export default wifiRouter