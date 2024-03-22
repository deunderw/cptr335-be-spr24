const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const expression = require('couchdb-expression')(session);
const auth = require('./Authentication/auth-controller');
require("./Authentication/pass-strategy");
const comm = require('./Communication/comm-controller');
const user = require('./Users/users-controller');
// const cookieParser = require('cookie-parser');

const app = express();
// app.use(cookieParser);
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
      httpOnly: false,
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
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

const port = process.env.PORT || 3001;
app.use(auth)

app.use(comm)

app.use(user)

app.listen(port, () => {
    console.log('Started server on port', port);
})
