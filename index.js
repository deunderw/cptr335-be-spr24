const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Started server on port', port);
})
