'use strict';
var express = require('express');
var router = express.Router();
var request = require('request-promise');
var http = require('http');
var app = require('./app.js');

var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Client = kafka.Client;

module.exports = function () {
  var args = arguments;
  return new Promise(function (resolve, reject) {
    var client = Client.apply(null, args);
    var producer = new Producer(client, { requireAcks: 1 });

    producer.on('ready', function () {
      resolve(promisedSend);
    });

    producer.on('error', function (err) {
      reject(err);
    });

    function promisedSend(payloads) {
      return new Promise(function (resolve, reject) {
        producer.send(payloads, function (error) {
          if (error) {
            return reject(error);
          }
          resolve();
        })
      });
    }
  });
};