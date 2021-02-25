const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  // res.redirect('/index.html')
});

module.exports = router;