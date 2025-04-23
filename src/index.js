const express = require('express');
const pool = require('./db/db'); 
const app = express();
app.use(express.json());

const schoolRoutes=require("./routes/schoolroutes")

app.get('/', (req, res) => {
  res.status(200).json({ ok: "ok" });
});

app.use('/',schoolRoutes)


app.listen(3000, () => {
  console.log('...on 3000');
});
