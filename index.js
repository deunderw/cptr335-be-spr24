const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const expression = require('couchdb-expression')(session);
const auth = require('./Authentication/auth-controller');
require("./Authentication/pass-strategy");
const comm = require('./Communication/comm-controller');
const app = express();
const user = require('./Users/users-controller');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const port = process.env.PORT || 3001;

const sessionStore = new expression({
  username: process.env.SUSERNAME,
  password: process.env.SPASSWORD,
  hostname: process.env.SHOSTNAME,
  port:     process.env.SPORT,
  database: process.env.SDBNAME,
  https:    false
});

app.use(session( {
    store: sessionStore,
    secret: 'secret',
    cookie: {
      maxAge: 3000,
    },
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(auth)

app.use(comm)

app.use(user)

app.listen(port, () => {
    console.log('Started server on port', port);
})
