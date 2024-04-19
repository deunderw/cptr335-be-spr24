const express = require('express');
const app = (module.exports = express());
const service = require('./stocks-service');

app.put('/be/stock/:symbol', async (req, res) => {
  const results = await service.updateStockPrice(req.params.symbol);
  if (results.err) {
    res.sendStatus(404).send({ error: results.err });
  } else {
    res.sendStatus(200);
  }
});

app.get('/be/stock/:symbol', async (req, res) => {
  const results = await service.getStock(req.params.symbol);
  res.send(results);
})

app.post('/be/stock/buy/:symbol/:quantity', async (req, res) => { 
  const clientId = req.session.user.id;
  if (clientId) {
    const results = await service.buyStock(req.params.symbol, req.params.quantity, clientId);
    res.send(results);
  } else {
    res.send({ error: 403, message: 'You must be logged in.' });
  }
})

app.get('/be/stocks', async (req, res) => {
  const results = await service.getStocks();
  res.send(results);
});

app.post('/be/initializeDB', async (req, res) => {
    const data = req.body;
    await service.initializeDB(data);
    res.sendStatus(200);
})