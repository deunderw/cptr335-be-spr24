/* const express = require('express');
const service = require('./auth-service');

const app = (module.exports = express());

app.post('/be/client',
    async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const isValid = await service.authenticateUser(username, password);

            if (isValid) {
                res.status(200).send({ status: 200 });
            } else {
                res.send(400).send({ status: 400 });
            }
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
); */

// Authentication/auth-controller.js
// Should be something like this 
const express = require("express");
const passport = require("passport");
const app = (module.exports = express());

app.post("/be/authenticate", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        status: 400,
        error: "Email/password is incorrect.",
        response: null,
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.client_id = user.client_id;
      req.session.first_name = user.first_name;
      req.session.last_name = user.last_name;
      req.session.email = user.email
      res.json({
        status: 200,
        clientId: user.client_id,
      });
    });
  })(req, res, next);
});