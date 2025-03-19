const express=require('express')
const connectDB=require('../src/config/db')

const authRoutes=require("../src/routes/authroute")

const app=express()

connectDB()

app.use(express.json())
app.use('/auth',authRoutes)
app.get('/',(req,res)=>{
    res.json({msg:"live ... 🔥"})
})
app.listen(3000,()=>{
    console.log("...on 3000")
})
