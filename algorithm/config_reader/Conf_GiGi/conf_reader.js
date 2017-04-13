'use strict'

const fs = require('fs');

/**
 * Expose module 'ConfigReader'
 */

module.exports = ConfigReader;

/**
 * An object to read configuration files information
 *
 * @param {String} filePath
 */

function ConfigReader(filePath){
	this.filePath = filePath;
	this.content = new Content();
}

ConfigReader.prototype.init = function(onsuccess) {

	fs.readFile(this.filePath, 'utf8', (err, data)=>{
		if(err){
			throw err;
		}		
		this.content.getContent(data);
		onsuccess();
	});	
};



ConfigReader.prototype.getItemValue = function(key) {
	return this.content.getItemValue(key);
};

/**
 * An method to set value by specified item
 *
 * @param {String} key
 * @param {String} value
 */

ConfigReader.prototype.setItemValue = function(key , value) {
	// body...
};

/**
 * An method to add new item
 *
 * @param {String} key
 * @param {String} value
 */

ConfigReader.prototype.addNewItem = function(key , value) {
	// body...
};

/**
 * An method to add item note
 *
 * @param {String} key
 * @param {Note} note
 */

ConfigReader.prototype.addItemNote = function(key , note) {
	// body...
};

/**
 * An method to remove specified item
 *
 * @param {String} key
 */

ConfigReader.prototype.removeItem = function(key) {
	// body...
};

/**
 * An method to save the updatest configuration file
 *
 */

ConfigReader.prototype.toSave = function() {
	// body...
};

/**
 * An object to describe a configuration file
 */

function Content(){
	this.content = new Array();
}

/**
 * An method to parse file content by lines
 */

Content.prototype.getContent = function(data) {
	this.content = data.split('\n');
};

/**
 * An method to get value by specified item
 *
 * @param  {String} key
 * @return {String}
 */

Content.prototype.getItemValue = function(key) {

	for(var i = 0; i < this.content.length; i++){
		if(0 == this.content[i].indexOf(key)){

			var valuePos = this.content[i].indexOf('=');
			return this.content[i].slice(valuePos+1);
		}
	}
	throw new Error('The ' + key + ' is not exited.');
};

Content.prototype.setItemValue = function(key , value) {
	// body...
};

Content.prototype.addNewItem = function(key , value) {
	// body...
};

Content.prototype.addItemNote = function(key , value) {
	// body...
};


function Note(content){
	this.content = contemt;

	this.toSave = toSave;
	function toSave(){
		return ('#' + this.content);
	}
}

function Item(key , value){
	this.key = key;
	this.value = value;

	this.toSave = toSave;
	function toSave(){
		return (this.key + '=' + this.value);
	}
}

function BlankLine(){
	this.toSave = toSave;
	function toSave(){
		return '\n';
	}
}



