var express = require('express');
var router = express.Router();
var request = require('request-promise');
//var jscookie = require('jscookie');
//var jscook = require('js-cookie');
//var Cookies = require( "cookies" );

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('postlisting', { title: 'Sell Pokemon' });
});

router.post('/', function(req, res, next) {
  console.log(req.cookies.auth);
    var options = {
    method: 'POST',
    uri: 'http://exp:8000/listing',
    body: {
      pokemon: req.body.pokemon,
      cp: req.body.cp,
      move1: req.body.move1,
      move2: req.body.move2,
      price: req.body.price,
      token: req.cookies.auth   
    },
    json: true
  }
  request(options)
  .then(function(parsedBody) {
      res.redirect('/postlisting');
  })
  .catch(function (err) {
    //console.log(err);
    //res.send(err);
    res.send(err);
    res.redirect('/login');
  })
})

module.exports = router;
