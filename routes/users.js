const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  console.log(process.cwd())
  res.redirect('/dashboard.html')

  // res.render('user', {
  //   user: JSON.stringify(userProfile, null, 2),
  //   title: 'Profile page'
  // });
});

module.exports = router;