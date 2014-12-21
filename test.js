// use this module
var plugwiseApi = require('./plugwise.js');
var MAC_PREFIX = '000D6F0000';

// enter and connect to your plugwise stick by entering its location
// on your system (this example is for the mac, on unix it
// would  be something more like /dev/ttyUSB0).
var plugwise = plugwiseApi.init({log: 1, serialport: '/dev/ttyUSB0'});

// create an instance of your appliance by entering its MAC address
var lamp = plugwise(MAC_PREFIX + '13A41C');

// turn it off
lamp.poweron();

