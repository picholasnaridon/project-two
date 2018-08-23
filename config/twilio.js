const accountSid = 'ACe212c6296bbd37f946e4a959f53e17b6';
const authToken = 'fd21873884524abeee4264f849df7716';
const client = require('twilio')(accountSid, authToken)

module.exports = client;