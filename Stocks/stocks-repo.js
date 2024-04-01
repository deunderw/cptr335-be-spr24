const nano = require('nano')(process.env.DBURL);
const db = nano.db.use(process.env.DBNAME);

const getStockPrice = async (symbol) => {

}

const setStockPrice = async(symbol, data, price) => {

}

module.exports = { 
    getStockPrice, 
    setStockPrice,
};