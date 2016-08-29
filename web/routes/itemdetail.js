var express = require('express');
var router = express.Router();
var request = require('request-promise');

/* GET home page. */
router.get('/:id', function(req, res, next) {

  var options = {
    method: 'GET',
    uri: 'http://exp:8000/listing/' + req.params.id
  }
  request(options)
  .then(function (response) {
    //res.send(response)
    var item = JSON.parse(response);
    res.render('itemdetail', { item: item});
  })
  .catch(function (err) {
    res.send(err)
  })
});

module.exports = router;
