var express = require('express');
var router = express.Router();
var request = require('request-promise');
var http = require('http');
var app = require('../app.js');

router.get('/', function(req, res, next) {
  var options = {
    method: 'GET',
    uri: 'http://models:8000/users',
    json: true
  }
  request(options)
  .then(function (response) {
    res.send(response);
  })
  .catch(function (err) {
    res.send(err)
  })
});

router.post('/', function(req, res, next) {
  var options = {
    method: 'POST',
    uri: 'http://models:8000/users',
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
    res.send('User added through the exp api');
  })
  .catch(function (err) {
    //console.log(err);
    //res.send(err);
    res.send('Something is not working');
  })
});

module.exports = router;