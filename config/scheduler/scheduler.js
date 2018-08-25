var schedule = require("node-schedule");
var twilio = require("./config.js"); // eslint-disable-line no-unused-vars
var models = require("../../models");

var sendMessage = function(sentBody, toNum, cb) {
  console.log("send message");
  //   twilio.messages
  //     .create({
  //       body: sentBody,
  //       //our twilio number, will always be this number
  //       from: "+19203358585",
  //       to: toNum
  //     })
  //     .then(message => cb(message.sid))

  //     .done();
};

schedule.scheduleJob("10 * * * * *", function() {
  console.log("running on 30");
  models.Message.findAll().then(function(results) {
    results.forEach(function(message) {
      sendMessage(message.body);
    });
  });
});
