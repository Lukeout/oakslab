var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var app = require('../app.js');
/* GET users listing. */

router.get('/', function(req, res, next) {
  //var db = req.db;
  var response = {};

  User.find({}, function(err, data) {
	  if (err) {
		  response = {"error": true, "message": "Error fetching users"};
	  }
	  else {
		  response = {"error": false, "message": data};
	  }
	  res.json(response);
  })
});

router.get('/:id', function(req, res, next) {
	var response ={};
	User.findById(req.params.id, function(err, data) {
		if (err) {
			response = {"error": true, "message": "Error fetching single user"};
		}
		else {
			response = {"error": false, "message": data};
		}
		res.json(response);
	})
});

router.delete('/:id', function(req, res, next) {
	var response ={};
	User.findById(req.params.id, function(err, data) {
		if (err) {
			response = {"error": true, "message": "User does not exist"};
		}
		else {
			User.remove({_id: req.params.id}, function(err) {
				if (err) {
					response = {"error": true, "message": "Error deleting user"}
				}
				else {
					rsponse = {"error": true, "message": "User was deleted"};
				}
				res.json(response);
			})
		}
	})
});

router.put('/:id', function(req, res, next) {
	var response ={};
	User.findById(req.params.id, function(err, data) {
		if (err) {
			response = {"error": true, "message": "Error updating user"};
			res.json(response);
		}
		else {
			if (req.body.password !== undefined) {
				data.password = req.body.password;
			}

			if (req.body.listing !== undefined) {
				data.listing = req.body.listing; 
			}

			data.save(function(err) {
				if (err) {
					response = {"error": true, "message": "Error updating user"};
				}
				else {
					response = {"error": false, "message": "User updated"};
				}
				res.json(response);
			})
		}
	});
});

router.post('/', function(req, res, next) {
	var user = new User();
	user.username = req.body.username; 
	user.password = req.body.password; 
	user.email = req.body.email;
	user.team = req.body.team; 
	var response = {};
	user.save(function(err) {
		if (err) {
			//response = {"error": true, "message": "Error adding user"};
			response = err;
		}
		else {
			response = {"error": false, "messag": "User added"};
		}
		res.json(response);
	})
}); 

module.exports = router;
