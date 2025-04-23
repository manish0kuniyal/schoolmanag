const express = require('express')
const app = express()
app.use(express.json())

const schoolRoutes=require("./src/routes/schoolroutes")
const pool=require("./src/db/db")
app.get('/hello', (req, res) => {
  res.status(200).json({ ok: "ok" })
});

app.use('/',schoolRoutes)


app.listen(3000, () => {
  console.log('...on 3000')
})