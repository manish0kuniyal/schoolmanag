import express from "express"
import { createServer } from "http"
import {Server} from 'socket.io'
import cors from 'cors'
const app=express()
const server=createServer(app)
const io=new Server(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

const  userConnection=new Map()

app.use(cors())
app.get('/',(req,res)=>{
  res.send({msg:"ok"})
})

io.on('connection',(socket)=>{
  console.log(`a new connection ${socket.id}`)
  userConnection.set(socket.id,socket)
  socket.on('disconnect',()=>{
    console.log(`disconnected ${socket.id}`)
  userConnection.delete(socket.id)
  })
})

server.listen(3000,()=>{
  console.log("...on 3000")
})