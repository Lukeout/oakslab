var express = require('express');
var router = express.Router();
var request = require('request-promise');
//var Cookies = require( "cookies" );
//var BPromise = require('bluebird');

router.get('/', function(req, res, next) {
   // console.log("Cookies :  ", req.cookies);
  res.render('login', { title: 'Login' });
});


router.post('/logout', function(req, res, next) {
  res.clearCookie('auth', { path: '/' });
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  res.render('logout', {title: 'Logout'});
})

router.post('/', function(req, res, next) {
  var options = {
    method: 'POST',
    uri: 'http://exp:8000/login',
    body: {
      username: req.body.username,
      password: req.body.password,
    },
    json: true
  }

  request(options)
  .then(function (response) {
    //console.log(response.token);
    res.cookie('auth', response.token, { maxAge: 10000000, path: '/' });
    res.redirect('/postlisting');
  })
  .catch(function (err) {
    res.send(err)
  })
});

module.exports = router;