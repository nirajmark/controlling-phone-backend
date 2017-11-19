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
      res.send(existingUser);
  }
  const sentUser = req.body;
  const user = await new User(sentUser).save();
  res.send(user);
});

router.get('/', (req, res, next) => {
  res.send({"email":"sample email", "firebaseId":"sample firebaseId","gcmToken":"sample gcmToken"});
});

router.post('/updateGCMToken', async (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const existingUser = await User.findOne({firebaseId:req.body.firebaseId});
  if (existingUser) {
      console.log('user already exist in db');
      existingUser.gcmToken = req.body.gcmToken
      const user = await existingUser.save();
      res.send(existingUser);
  }
  res.json(404);
  res.send(existingUser);
});





module.exports = router;
