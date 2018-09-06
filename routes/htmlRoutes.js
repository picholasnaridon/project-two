var htmlController = require("../controllers/htmlcontroller");
module.exports = function(app) {
  app.get("/", htmlController.index);
  app.get("/home", htmlController.home);
  app.get("/messages", isLoggedIn, htmlController.messages);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }
  app.get("/user", htmlController.profile);
};
