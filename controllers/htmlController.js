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
  },
  profile: function(req, res) {
      models.User.findAll({
        where: {
          id: req.user.id
        },
        include: [models.Message]
      }).then((returned) => {
        console.log(returned[0]["Messages"])
        res.render("user", { user: returned[0] })
      });
    }
  
};
