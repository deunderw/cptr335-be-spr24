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

app.get('/be/stock/price/:symbol', async (req, res) => {
  const results = await service.getLocalStockPrice(req.params.symbol);
  console.log(' show results = ', results);
  res.send({ "price": results} );
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