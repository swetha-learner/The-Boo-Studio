import { Server } from "socket.io"
import http from "http"
import express from "express"


const app = express()
const server = http.createServer(app)

//creating server
const myserver = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
    }
})

//real-time logic:
export function getReceiverChatId(userId){
    return activeUserMap[userId]
}
     


// store list of active users in key: value pair
const activeUserMap = {} 

myserver.on("connection", (socket) => {
    console.log("Boo-mate is connected", socket.id)

    const userId = socket.handshake.query.userId
    if(userId) activeUserMap[userId] = socket.id //updating active users to server
    
    
    // io.emit -> send message to every active user
    myserver.emit("getActiveUsers", Object.keys(activeUserMap));
   
    socket.on("disconnect", () => {
        console.log("Boo-mate is disconnected", socket.id)
        //displaying the offline status
        delete activeUserMap[userId]
        myserver.emit("getActiveUsers", Object.keys(activeUserMap));

    })
})

export {myserver, app, server}
