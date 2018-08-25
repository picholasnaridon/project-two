const models = require("../models");

module.exports = {
  //BASE ROUTES
  signin: function(req, res) {
    res.render("signIn");
  },
  signup: function(req, res) {
    res.render("signUp");
  },
  dashboard: function(req, res) {
    res.render("user");
  },
  logout: function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  }
};
