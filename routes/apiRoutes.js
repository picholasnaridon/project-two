var db = require("../models");

module.exports = function(app) {
  // Get all messages
  app.get("/api/messages", function(req, res) {
    db.Example.findAll({
      where: {
        // id: userId
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  // Create a new message
  app.post("/api/message", function(req, res) {
    db.Instance.create(req.message).then(function(result) {
      res.json(result);
    });
  });

  // Delete an example by id
  app.delete("/api/message/:id", function(req, res) {
    db.saveTheDate
      .destroy({ where: { id: req.params.id } })
      .then(function(saveTheDate) {
        res.json(saveTheDate);
      });
  });
};
