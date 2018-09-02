const models = require("../models"); // eslint-disable-line no-unused-vars

module.exports = {
  currentMessages: function(req, res) {
    console.log("get running");
    models.Message.findAll({
      where: {
        UserId: req.user.id,
        sent: false
      }
    }).then(function(messages) {
      console.log(messages);
      res.json(messages);
    });
  },

  getHistory: function(req, res) {
    models.Message.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(response => {
      res.json(response);
    });
  },

  newMessage: function(req, res) {
    console.log(req.body);
    models.Message.create({
      body: req.body.body,
      sendTime: Date.parse(req.body.sendTime),
      UserId: req.user.id
    }).then(result => {
      console.log("message submitted");
      res.json(result);
    });
  },

  updateMessage: function(req, res) {
    models.Message.update(
      {
        body: req.body.body
      },
      {
        where: { id: req.params.id }
      }
    ).then(result => {
      console.log(`message ${req.params.id} updated`);
      res.json(result);
    });
  },

  deleteMessage: function(req, res) {
    models.Message.destroy({ where: { id: req.params.id } }).then(response => {
      res.json(response);
    });
  },

  resendMessage: function(req, res) {
    console.log("resend controller running");
    console.log(req.body);
    models.Message.update(
      {
        sendTime: req.body.newTime,
        sent: false
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(result => {
      console.log(result);
      res.json(result);
    });
  }
};
