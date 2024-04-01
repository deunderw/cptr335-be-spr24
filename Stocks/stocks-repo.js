const nano = require('nano')(process.env.DBURL);
const db = nano.db.use(process.env.DBNAME); 

const getStockPrice = async (symbol) => {
    const http = require("https");

    const options = {
        "method": "GET",
        "hostname": "api.twelvedata.com",
        "port": null,
        "path": `/time_series?apikey=${process.env.STOCKS_API}&interval=1h&symbol=${symbol}&format=JSON&exchange=NASDAQ&type=stock&start_date=2024-03-25 10:17:00&end_date=2024-03-25 11:17:00`
    };
    
    const req = http.request(options, function (res) {
        const chunks = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function () {
            const body = Buffer.concat(chunks);
            return body.toString();
        });
    });
    
    req.end();        
    
}

const setStockPrice = async(symbol, data, price) => {

}

module.exports = { 
    getStockPrice, 
    setStockPrice,
};