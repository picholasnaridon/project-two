const models = require("../models"); // eslint-disable-line no-unused-vars

module.exports = {
  //BASE ROUTES
  signin: function(req, res) {
    res.render("signIn");
  },
  signup: function(req, res) {
    res.render("index");
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
