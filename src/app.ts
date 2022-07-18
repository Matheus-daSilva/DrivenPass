import express, { json } from "express"
import "express-async-errors"
import dotenv from "dotenv"
import cors from "cors"
import chalk from "chalk"

dotenv.config()

const app = express()
app.use(json())
app.use(cors())


const port = process.env.PORT || 4000
app.listen(port, () => console.log(chalk.green.bold(`The server is runinning on port ${port}`)))