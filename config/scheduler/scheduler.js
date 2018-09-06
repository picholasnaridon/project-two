var schedule = require("node-schedule");
var twilio = require("./config.js"); // eslint-disable-line no-unused-vars
var models = require("../../models");
var moment = require("moment");

var sendMessage = function(sentBody, toNum, messageId) {
  console.log("send message");
  twilio.messages
    .create({
      body: sentBody,
      from: "+19203358585",
      to: `+1${toNum}`
    })
    .then(function() {
      models.Message.update(
        { sent: true },
        {
          where: {
            id: messageId
          }
        }
      ).then(function() {
        console.log("Updated Messages to sent");
      });
    })
    .done();
};

schedule.scheduleJob("15 * * * * *", function() {
  var currentUnix = moment().unix();
  console.log(currentUnix);
  models.Message.findAll({
    where: {
      sent: false
    },
    include: [{ model: models.User }]
  }).then(function(messages) {
    return messages.forEach(message => {
      if (currentUnix - message.unixTime() <= 60) {
        console.log("message Sent");
        sendMessage(message.body, message.User.phone, message.id);
      }
    });
  });
});
