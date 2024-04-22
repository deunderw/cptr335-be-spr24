const { error } = require('console');
const express = require('express');
const passport = require('passport');
const app = (module.exports = express());

app.post('/be/authenticate', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('<<<< user =', user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        status: 400,
        error: 'Email/password is incorrect.',
        response: null,
      });
    } else {
      console.log('<<<< Here');
      req.login(user, (err) => {
        console.log('<<<< Not getting here... yet');
        if (err) {
          return next(err);
        }
        res.json({
          status: 200,
          message: 'Authentication successful',
        });
      });
    }
  })(req, res, next);
});

app.post('/be/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    if (!req.isAuthenticated()) {
      res.json({
        status: 200,
        message: 'Logout successful',
      });
    } else {
      res.json({
        status: 500,
        error: 'Logout failed',
      });
    }
  });
});
