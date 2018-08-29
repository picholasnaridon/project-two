const apiController = require("../controllers/apiController.js");

module.exports = function(app) {
  // Get all current messages for a user
  app.get("/api/messages/:id", apiController.currentMessages);
  // Get all messages for a user
  app.get("/api/history/:id", apiController.getHistory);
  // Create a new message
  app.post("/api/messages", apiController.newMessage);
  //update message//
  app.put("/api/update/:id", apiController.updateMessage);
  // Delete an example by id
  app.delete("/api/messages/:id", apiController.deleteMessage);
};
