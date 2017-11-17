var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('users');

/* GET users listing. */
router.post('/createUser', async (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const existingUser = await User.findOne({firebaseId:req.body.firebaseId});
  if (existingUser) {
      console.log('user already exist in db');
      res.send('User Already present');
  }
  const user = await new User({firebaseId:req.body.firebaseId,email:req.body.email}).save();
  res.send('user created successfully');
});

router.post('/updateGCMToken', async (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const existingUser = await User.findOne({firebaseId:req.body.firebaseId});
  if (existingUser) {
      console.log('user already exist in db');
      existingUser.gcmToken = req.body.gcmToken
      const user = await existingUser.save();
      res.send('User updated successfully');
  }
  res.sendStatus(404);
  res.send('user not found');
});





module.exports = router;
