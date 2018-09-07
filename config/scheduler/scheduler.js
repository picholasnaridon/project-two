var schedule = require("node-schedule");
var twilio = require("./config.js"); // eslint-disable-line no-unused-vars
var models = require("../../models");
var moment = require("moment");
const twilioNum  = process.env.TWILIO_NUM;

var sendMessage = function(sentBody, toNum, messageId) {
  console.log("send message");
  twilio.messages.create(
    {
      body: sentBody,
      from: twilioNum,
      to: `+1${toNum}`
    },
    function(err, message) {
      if (err) {
        console.log("err sending message", err);
      } else {
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
      }
    }
  );
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
      console.log(message.unixTime());
      if (currentUnix - message.unixTime() >= 60) {
        console.log("message Sent");
        sendMessage(message.body, message.User.phone, message.id);
      }
    });
  });
});
