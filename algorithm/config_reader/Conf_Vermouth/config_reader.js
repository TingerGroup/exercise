"use strict";

var fs = require('fs');

var NOTE_START_CHAR = '#';
var ITEM_EQUAL_CHAR = '=';

/*
Note: an Object to describe the comments in the configuration file;
parameter:
content: a comment expressed by a string;
*/
function Note(content) {
    this.content = content;
};

/*
This function saves the Object of Note as string;
*/
Note.prototype.toSave = function() {
    return this.content.toString() + '\n';
}

/*
Item: an Object to describe the configuration items in the configuration file;
parameters:
key: the key of the configuration item that expressed by a string;
value: the value of the configuration item that expressed by a string;
*/
function Item(key, value) {
    this.key = key;
    this.value = value;
};

/*
This function saves the Object of Item as string;
*/
Item.prototype.toSave = function() {
    return this.key.toString() + '=' + this.value.toString() + '\n';
}

/*
Empty: an Object to describe the blank lines in the configuration file;
*/
function Empty() {
};

/*
This function saves the Object of Empty as string;
*/
Empty.prototype.toSave = function() {
    return '\n';
}

/*
Document: an Object to describe a configuration file;
*/
function Document() {
    this.content = [];
};

/*
This function parses the configuration file by line;
*/
Document.prototype.parse = function(data) {
    var dataLines = data.split('\n');
    for (var i = 0; i < dataLines.length; i++) {
        this.parseLine(dataLines[i]);
    }
};

/*
This function parses the string to different Objects;
*/
Document.prototype.parseLine = function(data) {
    data = data.trim();
    if (!data) {
        this.content.push(new Empty());
        return;
    }
    if (data.indexOf(NOTE_START_CHAR) == 0) {
        this.content.push(new Note(data));
        return;
    }
    if (data.indexOf(ITEM_EQUAL_CHAR) > 0) {
        var dataSplit = data.split(ITEM_EQUAL_CHAR);
        this.content.push(new Item(dataSplit[0],dataSplit[1]));
    }
    return this.content;
};

/*
This function returns the content of the given key;
*/
Document.prototype.findItem = function(key) {
    for (var i = 0; i < this.content.length; i++) {
        if (this.content[i] instanceof Item) {
            if (this.content[i].key == key) {
                return this.content[i];
            }
        }
    }
};

/*
This function returns the position of the given key;
*/
Document.prototype.getItemPosition = function(key) {
    for (var i = 0; i < this.content.length; i++) {
        if (this.content[i] instanceof Item) {
            if (this.content[i].key == key) {
                return i;
            }
        }
    }
    return -1;
};

/*
This function returns the value of the given key;
*/
Document.prototype.getItemValue = function(key, onerror) {
    var itemToFind = this.findItem(key);
    if(itemToFind) {
        return itemToFind.value;
    }
    else {
        setTimeout( function(){
            onerror(new Error('The' + key + 'is not existed.'));
        },0 );
    }
};

/*
This function sets the value of the given key;
*/
Document.prototype.setItemValue = function(key, new_value, onerror) {
    var itemToUpdate = this.findItem(key);
    if(itemToUpdate) {
        itemToUpdate.value = new_value;
    }
    else {
        setTimeout( function(){
            onerror(new Error('The' + key + 'is not existed.'));
        },0 );
    }
};

/*
This function adds an item to the Document;
*/
Document.prototype.addItem = function(key, value, onerror) {
    if (this.getItemPosition(key) == -1) {
        this.content.push(new Item(key, value));
    }
    else {
        setTimeout( function(){
            onerror(new Error('The' + key + 'has already existed.'));
        },0 );
    }
};

/*
This function adds a note to the Document;
*/
Document.prototype.addNote = function(key, content, onerror) {
    var itemPos = this.getItemPosition(key);
    if (itemPos != -1) {
        this.content.splice(itemPos, 0, new Note(content));
    }
    else {
        setTimeout( function(){
            onerror(new Error('The' + key + 'is not existed.'));
        },0 );
    }
};

/*
This function change an item to a note of the Document;
*/
Document.prototype.deleteItem = function(key, onerror) {
    var itemToDelete = this.findItem(key);
    var itemPos = this.getItemPosition(key);
    if(itemPos != -1) {
        var note_content = '# ' + itemToDelete.key.toString() + '=' + itemToDelete.value.toString();
        this.content.splice(itemPos, 1, new Note(note_content));
    }
    else {
        setTimeout( function(){
            onerror(new Error('The' + key + 'is not existed.'));
        },0 );
    }
};

/*
This function saves the Object of Document as string;
*/
Document.prototype.toSave = function() {
    var dataString = [];
    for (var i = 0; i < this.content.length; i++) {
        if (i != this.content.length - 1) {
            dataString.push(this.content[i].toSave());
        }
        else if (i == this.content.length - 1 && this.content[i] instanceof Empty) {
        }
        else {
            dataString.push(this.content[i].toSave());
        }
    }
    return dataString.join('');
};

/*
Conf: an Object to describe a configuration file;
*/
function Conf(filePath) {
    this.filePath = filePath;
    this.document = new Document();
};

Conf.prototype.init = function(onsuccess, onerror) {
    var doc = this.document;
    fs.readFile(this.filePath, function(err, data) {
        if (err) {
            if (onerror) {
                onerror(err);
            }
            return;
        }
        console.log(data.toString());
        doc.parse(data.toString());
        onsuccess();
    });
};

Conf.prototype.getItemValue = function(key) {
    return this.document.getItemValue(key);
};

Conf.prototype.setItemValue = function(key, new_value) {
    return this.document.setItemValue(key, new_value);
};

Conf.prototype.addItem = function(key, value) {
    return this.document.addItem(key, value);
};

Conf.prototype.addNote = function(key, content) {
    return this.document.addNote(key, content);
};

Conf.prototype.deleteItem = function(key) {
    return this.document.deleteItem(key);
};

Conf.prototype.save = function(onsuccess, onerror) {
    fs.writeFile(this.filePath, this.document.toSave(), 'utf8', function(err) {
        if (err) {
            if (onerror) {
                onerror(err);
            }
            return;
        }
        onsuccess();
    });
};

module.exports = Conf;
