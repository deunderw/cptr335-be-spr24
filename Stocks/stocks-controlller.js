const express = require("express");
const app = (module.exports = express());
const service = require('./stocks-service'); 

app.put('/be/stock/:symbol', async (req, res) => {
    const results = await service.updateStockPrice(req.params.symbol);
    if (results.err) {
        res.sendStatus(404).send({error: results.err});
    } else {
        res.sendStatus(200);
    }
})