const mongoose=require('mongoose');

const schema=mongoose.Schema

const urlData=new schema({
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    referer: { type: String, default: "Direct Access" },
    origin: { type: String, default: "Unknown" },
    source: { type: String, default: "No source provided" },
    timestamp: { type: Date, default: Date.now }
})

module.exports=mongoose.model('urlData',urlData)