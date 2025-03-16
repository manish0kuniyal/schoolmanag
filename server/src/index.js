const express=require('express')
const app=express()
const testroute=require('../src/routes/testroute')

app.use(express.json())
app.use('/',testroute)

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
  });

  
app.listen(3000,()=>{
    console.log("...on 3000")
})

module.export= app