var express = require('express');
var router = express.Router();
var request = require('request-promise');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: 'Search' });
});

router.post('/', function(req, res, next) {

    var options = {
    method: 'POST',
    uri: 'http://exp:8000/search',
    body: {
      query: req.body.query
    },
    json: true
  }

  request(options)
  .then(function(response) {
    //var searchResults = JSON.parse(response);
    console.log(response);
    //res.send(response);
    res.render('searchresults', {results: response});
    //res.redirect('/');
  })
  .catch(function (err) {
    //console.log(err);
    //res.send(err);
    res.send('Something is not working');
  })
 
});

module.exports = router;
