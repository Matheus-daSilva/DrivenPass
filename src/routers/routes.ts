import express from "express"
import { appendFile } from "fs"
import authRoute from "./authRoute.js"
import cardsRoute from "./cardsRoute.js"
import credentialRoute from "./credentialsRoute.js"
import notesRoute from "./notesRoute.js"
import wifiRouter from "./wifiRouter.js"

const router = express.Router()

router.use(authRoute)
router.use(cardsRoute)
router.use(credentialRoute)
router.use(notesRoute)
router.use(wifiRouter)

export default router