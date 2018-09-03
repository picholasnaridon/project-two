const apiController = require("../controllers/apiController.js");

module.exports = function(app) {
  // Get all current messages for a user
  app.get("/api/messages/", apiController.currentMessages);
  // Get all messages for a user
  app.get("/api/history/", apiController.getHistory);
  // Create a new message
  app.post("/api/messages", apiController.newMessage);
  //update message//
  app.put("/api/update/:id", apiController.updateMessage);
  //update time and send status for resend message from profile history//
  app.put("/api/resend/:id", apiController.resendMessage);
  app.put("/api/profilepic", apiController.profilepic);
  // Delete an example by id
  app.delete("/api/messages/:id", apiController.deleteMessage);
};
