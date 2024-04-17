const { error } = require('console');
const express = require('express');
const passport = require('passport');
const app = (module.exports = express());

app.post('/be/authenticate', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
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
      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      res.json({
        status: 200,
      });
    }
  })(req, res, next);
});

app.post('/be/logout', (req, res, next) => {
  req.logout();

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
