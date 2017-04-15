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
	this.content = new Content(filePath);
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

ConfigReader.prototype.setItemValue = function(key , value) {
	return this.content.setItemValue(key , value);
};

ConfigReader.prototype.addNewItem = function(new_key , new_value) {
	return this.content.addNewItem(new_key , new_value);
};

ConfigReader.prototype.addItemNote = function(key , new_note_content) {
	return this.content.addItemNote(key , new_note_content);
};

ConfigReader.prototype.removeItem = function(key) {
	return this.content.removeItem(key);
};

/**
 * An object to describe a configuration file
 */

function Content(filePath){
	this.filePath = filePath;
	this.content = new Array();
}

/**
 * An method to parse file content by lines
 *
 * @param {String} data
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

	var itemPos = this.isExist(key);

	if(itemPos < 0){
		throw new Error('The ' + key + ' is not existed.');
	}
	var valuePos = this.content[itemPos].indexOf('=');
	return this.content[itemPos].slice(valuePos+1);
	
};

/**
 * An method to set value by specified item
 *
 * @param {String} key
 * @param {String} value
 */

Content.prototype.setItemValue = function(key , value) {

	var itemPos = this.isExist(key);

	if(itemPos < 0){
		throw new Error('The ' + key + ' is not existed.');
	}

	var item = new Item(key , value);
	this.content[itemPos] = item.toSave();
	var string = this.content.join('\n');
	this.toSave(string);
	
};

/**
 * An method to add new item
 *
 * @param {String} new_key
 * @param {String} new_value
 */

Content.prototype.addNewItem = function(new_key , new_value) {

	if(this.isExist(new_key) > 0){
		throw new Error('The ' + new_key + ' is existed.')
	}	

	var item = new Item(new_key , new_value);
	this.content.push(item.toSave());
	var string = this.content.join('\n');
	this.toSave(string);

};

/**
 * An method to add item note
 *
 * @param {String} key
 * @param {String} new_note_content
 */

Content.prototype.addItemNote = function(key , new_note_content) {
	
	var itemPos = this.isExist(key);
	var note = new Note(new_note_content); 

	if(itemPos < 0){
		throw new Error('The ' + key + ' is not existed.');
	}

	this.content.splice(itemPos,0,note.toSave());
	var string = this.content.join('\n');
    this.toSave(string);
	
};

/**
 * An method to remove specified item
 *
 * @param {String} key
 */

Content.prototype.removeItem = function(key) {
	
	var itemPos = this.isExist(key);

	if(itemPos){
		var note_item = new Note(this.content[itemPos]);
		this.content[itemPos] = note_item.toSave();
		var string = this.content.join('\n');
	    this.toSave(string);
	}
};

/**
 * An method to save all changes to file
 *
 * @param {String} string
 */

Content.prototype.toSave = function(string) {
	
	fs.writeFile(this.filePath, string, 'utf8', (err)=>{
		if(err){
			throw err;
		}
	})
};

/**
 * An method to check the key is exist in configuration file or not
 *
 * @param {String} key
 */

Content.prototype.isExist = function(key) {

	for(var i = 0; i<this.content.length; i++){

		if(0 == this.content[i].indexOf(key)){
			return i;
		}
	}
	return -1;
};

/*
 * An object to describe note
 */

function Note(content){
	this.content = content;

	this.toSave = function(){
		return ('#' + this.content);
	}
}

/*
 *An method to describe configuration item
 */

function Item(key , value){
	this.key = key;
	this.value = value;

	this.toSave = function(){
		return (this.key + '=' + this.value);
	}
}




