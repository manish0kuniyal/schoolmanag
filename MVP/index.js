const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const urlData = require('./schema');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const connectDB=async()=>{
    try{await 
mongoose.connect(process.env.URL,{ useNewUrlParser: true, useUnifiedTopology: true })
console.log("..connected to DB")
}
catch(err){
    console.log(err);   
}
}
connectDB();

app.get('/',async (req, res) => {
    const requestInfo = {
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        referer: req.get("Referer") || "Direct Access",
        origin: req.get("Origin") || "Unknown",
        source : req.query.source || 
    req.query.utm_source || 
    (req.headers.referer ? new URL(req.headers.referer).hostname : 'direct')
        };

    const data=new urlData(requestInfo);
    await data.save();
        res.json({msg:"Data saved"});
    // res.json({ message: requestInfo });
});
app.get('/clicks', async (req, res) => {
    try {
        const clicks = await urlData.find(); // Fetch all stored data
        res.render('clicks', { clicks }); // Render 'clicks.ejs' template
    } catch (err) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
})
