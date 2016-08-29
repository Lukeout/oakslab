var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var app = require('../app.js');
var jwt = require('jsonwebtoken');


router.post('/', function(req, res, next) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            throw err; 
        }

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found'});
        }

        else if (user) {
            if (user.password !== req.body.password) {
                res.json({ success: false, message: 'Authentication failed, Wrong password'});
            }
            else {
                var token = jwt.sign(user, 'poke', {
                    expiresIn: '1440m'  // expires in 24 hours
                })

                res.json({
                    success: true,
                    username: req.body.username,
                    message: 'Here is your token',
                    token: token
                })
            }
        }
    })
});

module.exports = router;