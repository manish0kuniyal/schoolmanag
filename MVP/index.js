const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const requestInfo = {
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        referer: req.get("Referer") || "Direct Access",
        origin: req.get("Origin") || "Unknown",
        source: req.query.source || "No source provided" // Capture the source from query params
    };
    
    res.json({ message: requestInfo });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
