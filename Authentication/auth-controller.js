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
      console.log('<<<< user =', user);
      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      res.json({
        status: 200,
        message: 'Authentication successful',
      });
    }
  })(req, res, next);
});

app.post('/be/logout', (req, res, next) => {
  // Clear the session data
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    // Clear the session cookie by setting its expiration time to a past date
    res.clearCookie('connect.sid');

    // Logout successful
    res.json({
      status: 200,
      message: 'Logout successful',
    });
  });
});
