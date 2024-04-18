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

app.post('/be/stock/buy/:symbol/:quantity', async (req, res) => {
  const clientId = req.session.clientId;
  if (clientId) {
    const results = await service.buyStocks(clientId, req.params.symbol, req.params.quantity);
    if (results.error) {
      res.send({ error: results.error, messaage: results.message});
    } else {
      res.send({ newBalance: results.balance, portfolio: results.portfolio });
    }
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