const express = require('express');
const pool = require('./db'); // <- import the pool here

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ ok: "ok" });
});

app.listen(3000, () => {
  console.log('...on 3000');
});
