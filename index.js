const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Started server on port', port);
})

// ATTEMPTING TO FIGURE OUT PASSPORT BELOW

const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
  }))
  
  app.use(passport.initialize()) // init passport on every route call.
  app.use(passport.session())    // allow passport to use "express-session".

  authUser = (user, password, done) => {
    console.log(`Value of "User" in authUser function ----> ${username}`)
    console.log(`Value of "Password" in authUser function ----> ${password}`)

    let authenticated_user = { id: 1, name: "Mickey"}
    return done (null, authenticated_user )
  }

  passport.use(new LocalStrategy (authUser))

  let count = 1

printData = (req, res, next) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`req.body.username -------> ${req.body.user}`) 
    console.log(`req.body.password -------> ${req.body.password}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)
  
    console.log(`\n req.user -------> `) 
    console.log(req.user) 
  
    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`) 
    console.log(`req.session.cookie -------> `) 
    console.log(req.session.cookie) 
  
    console.log("===========================================\n")

    next()
}

app.use(printData)

app.post ("/login", passport.authenticate('local', {
    successRedirect: console.log("\n Login Successful"),
    failureRedirect: console.log("\n Login Failed"),
 }))