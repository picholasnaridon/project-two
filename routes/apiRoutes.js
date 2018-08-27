var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/messages/:id", function(req, res) {
    console.log("get running");
    db.Message.findAll({
      where: {
        //sent: false,   //for when we have this functionality implemented, for showing currently active messages list
        UserId: req.params.id
      }
    }).then(function(messages) {
      console.log(messages);
      res.json(messages);
    });
  });

  app.get("/api/history/:id", function(req, res) {
    db.Message.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(response => {
      res.json(response);
    });
  });

  // Create a new example
  app.post("/api/messages", function(req, res) {
    console.log(req.body);
    db.Message.create({
      body: req.body.body,
      sendTime: req.body.sendTime,
      UserId: req.body.UserId
    }).then(result => {
      console.log("message submitted");
      res.json(result);
    });
  });

  // Delete an example by id
  app.delete("/api/messages/:id", function(req, res) {
    db.Message.destroy({ where: { id: req.params.id } }).then(response => {
      res.json(response);
    });
  });
};
