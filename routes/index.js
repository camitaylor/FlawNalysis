const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
  res.send('There is no war in ba sing se')
});

module.exports = router;