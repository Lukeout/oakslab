var express = require('express');
var router = express.Router();
var request = require('request-promise');
var http = require('http');
var app = require('../app.js');
var elasticsearch = require('elasticsearch');

router.post('/', function(req, res, next) {

    //var pkmn = Number(req.body.query);
    //console.log(pkmn);
    //console.log(req.body.query);
    var client = new elasticsearch.Client({
        host: 'es:9200',
        log: 'trace'
    });

    client.ping({
        // ping usually has a 3000ms timeout 
        requestTimeout: Infinity,
        // undocumented params are appended to the query string 
        hello: "elasticsearch!"
        }, function (error) {
        if (error) {
            console.trace('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    });

    client.search({
    index: 'listings',
    lenient: true,
    body: {
        query: {
        match: {
            _all: req.body.query
            }
        }
    }
    }).then(function (resp) {
        var hits = resp.hits.hits;
        //console.log(hits);
       // var searchResults = JSON.parse(hits);
        res.send(hits);
    }, function (err) {
        console.trace(err.message);
    });

});

module.exports = router;