'use strict'
const fs = require('fs');

var filePath = './default.conf';
var conf_reader = require('./conf_reader.js');

var test = new conf_reader(filePath);

//test.init();
console.log(test.getItemValue('DSHELL'));



