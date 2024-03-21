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
    } else {
      req.session.clientid = user.id;
      res.json({
        status: 200,
      });
    }
      
  })(req, res, next);
});