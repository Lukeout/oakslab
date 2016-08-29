var express = require('express');
var router = express.Router();
var request = require('request-promise');
var http = require('http');
var app = require('../app.js');

// var kafka = require('kafka-node'),
//     Producer = kafka.Producer,
//     //KeyedMessage = kafka.KeyedMessage,
//     client = new kafka.Client('kafka:9092'),
//     producer = new Producer(client);
//     //km = new KeyedMessage('key', 'message');

var producerPromise = require('../producer.js');
var producerReady = producerPromise('kafka:9092'); // NOTE: this is ZK address!

router.get('/', function(req, res, next) {
  var options = {
    method: 'GET',
    uri: 'http://models:8000/listings',
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

router.get('/:id', function(req, res, next) {
  var options = {
    method: 'GET',
    uri: 'http://models:8000/listings/' + req.params.id,
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
    uri: 'http://models:8000/listings',
    body: {
      pokemon: req.body.pokemon,
      cp: req.body.cp,
      hp: req.body.hp,
			move1: req.body.move1,
			move2: req.body.move2,
			price: req.body.price,
			owner: req.body.owner, 
      token: req.body.token
    },
    json: true
  }
  request(options)
  .then(function(parsedBody) {
    //payloads = [];
    //var msg = { topic: 'new-listings-topic', messages: parsedBody, partition: 0 };
    //payloads.push(msg)
    payloads = [
        { topic: 'new-listings-topic', messages: parsedBody, partition: 0 },
    ];

    console.log(producerPromise);
    producerReady.then (function (producerSend) { return  producerSend([{topic: 'new-listings-topic', partition: 0, messages: parsedBody}]);  });

   // console.log(producer);
   // console.log(client);
   // console.log(payloads);
    
   // var pySend = parsedBody;
  //var spawn = require("child_process").spawn;
  //var process = spawn('python',["producer.py", pySend]);

    //  if (client.ready) {
    //   console.log('client is ready');
    // }
    // else {
    //   console.log('client is not ready');
    // }

    // if (producer.ready) {
    //   console.log('producer is ready');
    // }
    // else {
    //   console.log('producer is not ready');
    // }


    //client.ready = true; 
    //producer.ready = true; 
  //   producer.on('ready', function () {
  //     producer.send(payloads, function (err, data) {
  //       console.log(payloads)
  //       console.log(data);
  //     });
  //  });

  //  producer.on('error', function (err) {
  //    console.log('There was an error');
  //    console.log(err);
  //  });
    res.send(parsedBody);
    //res.send('Pokemon added through the exp api');
  })
  .catch(function (err) {
    res.send(err)
  })
});



module.exports = router;
