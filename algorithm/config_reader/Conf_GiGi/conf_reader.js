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
	this.content = new Array();
}

/**
 * An method to parase the configuration file by lines 
 * and init ConfigReader
 */

ConfigReader.prototype.init = function() {
	// body...
};
/**
 * An method to get value by specified item
 *
 * @param  {String} key
 * @return {String}
 */

ConfigReader.prototype.getItemValue = function(key) {
	// body...
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
 * @param {Item} item
 */

ConfigReader.prototype.addNewItem = function(item) {
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

function Note(content){
	this.content = contemt;

	this.toSave = toSave;
	function toSave(){
		return ("#" + this.content);
	}
}

function Item(key , value){
	this.key = key;
	this.value = value;

	this.toSave = toSave;
	function toSave(){
		return (this.key + "=" + this.value);
	}
}

function BlankLine(){
	this.toSave = toSave;
	function toSave(){
		return '\n';
	}
}



