var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/messages", function(req, res) {
    console.log(req.body)
    db.Message.findAll({}).then(result => {
      console.log(result)
    })
 
  });

  // Create a new example
  app.post("/api/messages", function(req, res) {
    console.log(req.body)
    db.Message.create({
      body: req.body.body,
      sendTime: req.body.sendTime,
      UserId: req.body.UserId
    }).then(result => {
      console.log("message submitted");
      res.json(result);
    })
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
