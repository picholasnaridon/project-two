var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/messages/:id", function(req, res) {
    console.log("get running");
    var targetId = req.params.id;
    db.Message.findAll({where: {UserId: targetId}}).then(function(messages) {
      console.log(messages)
      res.json(messages);
    });
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

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(
//       dbExample
//     ) {
//       res.json(dbExample);
//     });
//   });
};