// use this module
var plugwiseApi = require('./plugwise.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

var macs = [
  '000D6F0000138F3E',
  '000D6F00003FF431',
  '000D6F0000237162',
  '000D6F0000236735',
  '000D6F000023676F',
  '000D6F00003FEEDF',
  '000D6F0000138F43',
  '000D6F00003FDF9D',
  '000D6F00001C7D38',
  '000D6F00001399FE',
  '000D6F0000138B3F',
  '000D6F00002365E0',
  '000D6F00003FF5DA',
  '000D6F00003FD54C',
  '000D6F0000138F45',
  '000D6F000013942E',
  '000D6F00001C83EA',
  '000D6F000013A41C',
  '000D6F0000138F2C',
  '000D6F000013941D',
  '000D6F0000138F3B',
  '000D6F0000138B3C'
];

var modules = new Object();
var plugwise = plugwiseApi.init({log: 1, serialport: '/dev/ttyUSB0'});

// initialize modules
for(var i = 0; i < macs.length; ++i)
  modules[macs[i].substr(-5)] = plugwise(macs[i]); 

app.get('/info/:name', function(req, res) {
  req.params.name = req.params.name.toUpperCase();
  if(typeof modules[req.params.name] === "undefined")
    res.status(404).send('Module was not found');
  else
    modules[req.params.name].info(function(data) {
      res.json(data);
    });
});

app.get('/powerinfo/:name', function(req, res) {
  req.params.name = req.params.name.toUpperCase();
  if(typeof modules[req.params.name] === "undefined")
    res.status(404).send('Module was not found');
  else
    modules[req.params.name].powerinfo(function(data) {
      res.json(data);
    });
});

app.post('/power/:name', function(req, res) {
  req.params.name = req.params.name.toUpperCase();
  if(typeof modules[req.params.name] === "undefined")
    res.status(404).send('Module was not found');
  else
  {
    var power = req.param('power');
    if(power === "on" || power === "1")
      modules[req.params.name].poweron();
    else if(power === "off" || power === "0")
      modules[req.params.name].poweroff();
    else
      res.status(400).send('Bad request');
  }
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('fnordautomation listening at http://%s:%s', host, port);
});

