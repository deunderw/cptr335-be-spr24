const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const expression = require('couchdb-expression')(session);
const auth = require('./Authentication/auth-controller');
require("./Authentication/pass-strategy");
const comm = require('./Communication/comm-controller');
const user = require('./Users/users-controller');
const stocks = require('./Stocks/stocks-controlller');
const cron = require('node-cron');
const stockService = require('./Stocks/stocks-service');

const app = express();
const sessionStore = new expression({
  username: process.env.SUSERNAME,
  password: process.env.SPASSWORD,
  hostname: process.env.SHOSTNAME,
  port:     process.env.SPORT,
  database: process.env.SDBNAME,
  https:    false //.env variable didn't seem to work
});

app.use(session( {
    store: sessionStore,
    secret: 'secret',
    cookie: {
      expires: null,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, X-AUTHENTICATION, X-IP",
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

const port = process.env.PORT || 3001;
app.use(auth)

app.use(comm)

app.use(user)

app.use(stocks);

// Schedule cron jobs
  // cron.schedule('46 9-15 * * 1-5', () => {
  //   stockService.updateStockPrice('GOOGL');
  // });
  // cron.schedule('48 9-15 * * 1-5', () => {
  //   stockService.updateStockPrice('MDB');
  // });
  // cron.schedule('50 9-15 * * 1-5', () => {
  //   stockService.updateStockPrice('DDOG');
  // });
  // cron.schedule('52 9-15 * * 1-5', () => {
  //   stockService.updateStockPrice('QCOM');
  // });
  // cron.schedule('54 9-15 * * 1-5', () => {
  //   stockService.updateStockPrice('NVDA');
  // });
  // cron.schedule('56 9-15 * * 1-5', () => {
  //   stockService.updateStockPrice('MSFT');
  // });
  // cron.schedule('58 9-15 * * 1-5', () => {
  //   stockService.updateStockPrice('INTU');
  // });
  // cron.schedule('0 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('GOOG');
  // }).start();
  // cron.schedule('2 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('ADSK');
  // }).start();
  // cron.schedule('4 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('ANSS');
  // }).start();
  // cron.schedule('6 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('KLAC');
  // }).start();
  //   cron.schedule('8 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('ASML');
  // }).start();
  // cron.schedule('10 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('CTSH');
  // }).start();
  // cron.schedule('12 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('AMD');
  // }).start();
  // cron.schedule('14 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('AVGO');
  // }).start();
  // cron.schedule('16 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('CRWD');
  // }).start();
  // cron.schedule('18 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('LRCX');
  // }).start();
  // cron.schedule('20 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('PANW');
  // }).start();
  // cron.schedule('22 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('GFS');
  // }).start();
  // cron.schedule('24 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('TXN');
  // }).start();
  // cron.schedule('26 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('CDW');
  // }).start();
  // cron.schedule('28 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('DASH');
  // }).start();
  // cron.schedule('30 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('AMAT');
  // }).start();
  // cron.schedule('32 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('NXPI');
  // }).start();
  // cron.schedule('34 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('MU');
  // }).start();
  // cron.schedule('36 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('AAPL');
  // }).start();
  // cron.schedule('38 10-16 * * 1-5', () => {S
  //   stockService.updateStockPrice('META');
  // }).start();
  // cron.schedule('40 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('ADI');
  // }).start();
  // cron.schedule('42 10-16 * * 1-5', () => {
  //   stockService.updateStockPrice('ON');
  // }).start();

app.listen(port, () => {
    console.log('Started server on port', port);
})
