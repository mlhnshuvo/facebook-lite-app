const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (to) => {
  client.messages
    .create({
      body: 'Welcome to our account',
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    })
    .then(message => console.log(message.sid))
    .catch((error) => console.log(error))
}