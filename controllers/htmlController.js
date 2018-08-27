const models = require("../models"); // eslint-disable-line no-unused-vars

module.exports = {
  //BASE ROUTES
  index: function(req, res) {
    res.render("index");
  },
  messages: function(req, res) {
    models.Message.findAll({
      where: { UserId: req.user.id }
    }).then(function(messages) {
      res.render("messages", { messages: messages });
    });
  }
};
