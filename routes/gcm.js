var express = require('express');
var gcm = require('node-gcm');
var gcm_config = require('../config/gcm-config.js')
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {

  console.log('gcm_config = '+JSON.stringify(gcm_config));

  //send GCM request to mobile
    // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
    console.log('gcm_config.API_KEY = '+gcm_config.API_KEY);
  var sender = new gcm.Sender(gcm_config.API_KEY);

  // Prepare a message to be sent
  var message = new gcm.Message({
      data: { action: 'silent' }
  });

  // Specify which registration IDs to deliver the message to
  console.log('gcm_config.registrationTokens = '+gcm_config.registrationToken);
  var regTokens = [gcm_config.registrationToken];

  // Actually send the message
  sender.send(message, { registrationTokens: regTokens }, function (err, response) {
      if (err) {
        console.error(err);
        res.send("Something went wrong");
      }
      else{
        console.log(response);
        res.send("successfully sent message");
      }
  });

});

module.exports = router;
