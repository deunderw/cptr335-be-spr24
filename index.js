const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const auth = require('./Authentication/auth-controller');
require("./Authentication/pass-strategy");
const app = express();

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

app.use(session( {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(auth)

app.listen(port, () => {
    console.log('Started server on port', port);
})
