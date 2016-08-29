var express = require('express');
var router = express.Router();
var Listing = require('../models/listings.js');
var app = require('../app.js');
var jwt = require('jsonwebtoken');
/* GET Listings listing. */

router.get('/', function(req, res, next) {
  //var db = req.db;
  var response = {};

  Listing.find({}, function(err, data) {
	  if (err) {
		  response = {"error": true, "message": "Error fetching Listings"};
	  }
	  else {
		  response = {"error": false, "message": data};
	  }
	  res.json(response);
  })
});

router.get('/:id', function(req, res, next) {
	var response ={};
	Listing.findById(req.params.id, function(err, data) {
		if (err) {
			response = {"error": true, "message": "Error fetching single Listing"};
		}
		else {
			response = {"error": false, "message": data};
		}
		res.json(response);
	})
});

router.delete('/:id', function(req, res, next) {
	var response ={};
	Listing.findById(req.params.id, function(err, data) {
		if (err) {
			response = {"error": true, "message": "Listing does not exist"};
		}
		else {
			Listing.remove({_id: req.params.id}, function(err) {
				if (err) {
					response = {"error": true, "message": "Error deleting Listing"}
				}
				else {
					rsponse = {"error": true, "message": "Listing was deleted"};
				}
				res.json(response);
			})
		}
	})
});

router.post('/', function(req, res, next) {

var token = req.body.token || req.query.token || req.header['x-access-token'];
//console.log(token);
if (token) {
	jwt.verify(token, 'poke', function (err, decoded) {
		if (err) {
			console.log('Token not verified');
			res.json({success: false, message: err});
		}
		else {
			var listing = new Listing();
			listing.pokemon = req.body.pokemon;
			listing.cp 	= req.body.cp;
			listing.hp = req.body.hp;
			listing.move1 = req.body.move1;
			listing.move2 = req.body.move2;
			listing.price = req.body.price;
			listing.owner = req.body.owner; 
			var response = {};
			listing.save(function(err) {
				if (err) {
					//response = {"error": true, "message": "Error adding user"};
					response = err;
				}
				else {
					//console.log(listing._id);
					response = listing;
				}
				res.json(response);
			})
		}
	})
}

	
}); 

module.exports = router;
