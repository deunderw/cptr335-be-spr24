const repo = require('./stocks-repo')

const updateStockPrice = async (symbol) => {
    return new Promise (async (resolve, revoke) => {
        const response = await repo.getStockPrice(symbol);
        const data = JSON.parse(response).values;
        if (data) {
            await repo.setStockPrice(symbol, data[0].close, data[0].datetime);
            console.log('<<<<< updating: ', symbol);
            resolve({});
        } else {
            revoke({ err: 'Update failed for symbol:', symbol }); 
        }
    })
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
        const response = await repo.getStockPrice(symbol);
    })
};

const initializeDB = async (data) => {
    const callInsert = async (row) => {
        return new Promise (async (resolve) => {
            await repo.insertIntoDB(row);
            resolve();
        })
    }

    const promises = [];
    data.map(r => promises.push(callInsert(r)));
    Promise.all(promises)
        .then(() => {return});
}

module.exports = {
    updateStockPrice,
    initializeDB,
}