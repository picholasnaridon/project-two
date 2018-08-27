var htmlController = require("../controllers/htmlcontroller");
module.exports = function(app) {
  app.get("/", htmlController.index);
  app.get("/messages", isLoggedIn, htmlController.messages);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }
};
