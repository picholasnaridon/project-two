const models = require("../models"); // eslint-disable-line no-unused-vars

module.exports = {
  //BASE ROUTES
  home: function(req, res) {
    res.render("home");
  },
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
    req.session.destroy(function() {
      res.redirect("/");
    });
  }
};
