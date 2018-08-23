// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
var twilio = require("./config/twilio.js");

var message = {
    send: function (sentBody, toNum, cb){
        twilio.messages
            .create({
                body: sentBody,
                //our twilio number, will always be this number
                from: '+19203358585',
                to: toNum
            })
            .then(message => console.log(message.sid))
            .then( () => {
                cb(message.sid)
                })
            .done();
    }
}
module.exports = message;