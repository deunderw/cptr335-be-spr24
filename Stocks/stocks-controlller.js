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

app.post('/be/initializeDB', async (req, res) => {
    const data = req.body;
    await service.initializeDB(data);
    res.sendStatus(200);
})

app.post('/be/stock/sell', async (req, res) => {
    const symbol = req.body.symbol;
    const quantity = req.body.quantity;
    const userId = req.session.id;
    await service.sellStock(symbol, quantity, userId);
    res.sendStatus(200);
})

app.post('be/stock/buy', async (req, res) => {
    const symbol = req.body.symbol;
    const quantity = req.body.quantity;
    const userId = req.session.id;
    await service.buyStock(symbol, quantity, userId);
    res.sendStatus(200);
})