const express=require('express')
const app=express()

app.get('/',(req,res)=>{
    const requestInfo={
        ip: req.ip, 
        userAgent: req.get("User-Agent"), 
        referer: req.get("Referer") || "Direct Access", 
        origin: req.get("Origin") || "Unknown",
    }
    res.json({message:requestInfo})
})

app.listen(3000,()=>{
    console.log('..on 3000')
})