import express from "express" //const express = require("express")
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"

import path from "path"

import { ConnectDB } from "./lib/db.js"

import { app, server } from "./lib/socket.io.js"
import authRoutes from "./routes/auth.route.js" //.js is imp to mention for local files!
import messageRoutes from "./routes/message.route.js"



dotenv.config()
//const app = express() --> created one in socket.js


//|| 3000
const port = process.env.PORT 
const __dirname = path.resolve()

app.use(express.json({limit: "50mb"})) //middleware --> extracts json data of req.body
app.use(express.urlencoded({ extended: true , limit: "50mb"}));
app.use(cookieParser()) //allows to parse cookie
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))


app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true, //allow cokkies to be sent with req
    methods: ["GET", "POST","PUT","DELETE"],
    origin: true,
}
))



//auth route 
app.use("/api/auth", authRoutes)
//message route
app.use("/api/messages", messageRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}




server.listen(port , (req, res) => {
    console.log(`server running on the port: ${port}`)
    ConnectDB()
})