var express = require('express');
var router = express.Router();
var request = require('request-promise');

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', function(req, res, next) {
  var options = {
    method: 'POST',
    uri: 'http://exp:8000/register',
    body: {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      team: req.body.team,
    },
    json: true
  }

  request(options)
  .then(function(parsedBody) {
      res.redirect('/');
  })
  .catch(function (err) {
    //console.log(err);
    //res.send(err);
    res.send('Something is not working');
  })
});

module.exports = router;