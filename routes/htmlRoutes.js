var htmlController = require("../controllers/htmlcontroller");
module.exports = function(app) {
  app.get("/", htmlController.home);
  app.get("/index", htmlController.index);
  app.get("/messages", isLoggedIn, htmlController.messages);

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }
  app.get("/user", htmlController.profile);
};
