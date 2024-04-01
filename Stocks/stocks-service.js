const repo = require('./stocks-repo')

const updateStockPrice = async (symbol) => {
    const response = await repo.getStockPrice(symbol);
    if (response.values && response.values.length > 0) {
        await repo.setStockPrice()
    } else {
        return ({ err: 'Update failed' }); 
    }
};

module.exports = {
    updateStockPrice,
}