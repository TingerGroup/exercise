'use strict'
const fs = require('fs');

var filePath = './default.conf';
var conf_reader = require('./conf_reader.js');

var test = new conf_reader(filePath);

test.init(function(){
	console.log(test.getItemValue('DSHELL'));
	test.setItemValue('TESTKEY','testSuccess');
	test.addNewItem('NEWKEY','testSuccess');
	test.addItemNote('NEWKEY','This is a test item');
	test.removeItem('NEWKEY');
});




