var express = require('express');
var router = express.Router();
var request = require('request-promise');
var http = require('http');
var app = require('../app.js');

router.post('/', function(req, res, next) {
  var options = {
    method: 'POST',
    uri: 'http://models:8000/authenticate',
    body: {
      username: req.body.username,
      password: req.body.password,
    },
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

module.exports = router;