const repo = require('./stocks-repo');
const userRepo = require('../Users/users-repo');

const updateStockPrice = async (symbol) => {
  return new Promise(async (resolve, revoke) => {
    const response = await repo.getStockPrice(symbol);
    const code = JSON.parse(response).code;
    if (code) {
      revoke({ err: 'No data for symbol' + symbol});
    }
    const data = JSON.parse(response).values;
    if (data) {
      await repo.setStockPrice(symbol, data[0].close, data[0].datetime);
      resolve({});
    } else {
      revoke({ err: 'Update failed for symbol:' + symbol });
    }
  });
};

const sellStock = async (symbol, quantity, userid) => {
    return new Promise (async (resolve, revoke) => {
        const response = await repo.getQuantityOwned(userid, symbol, quantity);
        const data = JSON.parse(response).values;
        if (data < quantity) {
            await repo.sellStock();
            resolve({});
        }
    })
};

const buyStock = async (symbol, quantity, userid) => {
    return new Promise (async (resolve, revoke) => {
      const userData = await userRepo.getById(userid);
      const response = await repo.getStock(symbol);
      if (response.error) {
        // revoke({ error: 'Failed to get stock', errorMessage: response.error});
        revoke({ error: 'Failed to get stock', errorMessage: response.error });
      }
      const cost = response.price * quantity;
      userData.balance -= cost;
      let found = false;
      if (userData.portfolio) {
        userData.portfolio.map(s => {
          if (s.symbol == symbol) {
            s.quantity = Number(s.quantity) + Number(quantity);
            found = true;
          }
        });
      }
      if (!found) {
        if (userData.portfolio) {
          userData.portfolio.push({ symbol, quantity });
        } else {
          userData.portfolio = [{ symbol, quantity }]
        }
       }
      const results = await userRepo.updatePortfolio(userid, userData);
      resolve(results);
    })
};

const getStock = async (symbol) => {
  return new Promise(async (resolve) => {
    const data = await repo.getStock(symbol);
    resolve(data)
  })
}

const initializeDB = async (data) => {
  const callInsert = async (row) => {
    return new Promise(async (resolve) => {
      await repo.insertIntoDB(row);
      resolve();
    });
  };

  const promises = [];
  data.map((r) => promises.push(callInsert(r)));
  Promise.all(promises).then(() => {
    return;
  });
};

const getStocks = async () => {
  return await repo.getStocks();
}

module.exports = {
  updateStockPrice,
  initializeDB,
  getStocks,
  getStock,
  buyStock,
};
