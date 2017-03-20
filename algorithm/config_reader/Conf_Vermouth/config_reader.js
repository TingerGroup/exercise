"use strict";

var fs = require('fs');

var NOTE_START_CHAR = '#';
var ITEM_EQUAL_CHAR = '=';

function Note(content) {
    this.content = content;
};

Note.prototype.toSave = function() {
    return this.content.toString() + '\n';
}

function Item(key, value) {
    this.key = key;
    this.value = value;
};

Item.prototype.toSave = function() {
    return this.key.toString() + '=' + this.value.toString() + '\n';
}

function Empty() {
};

Empty.prototype.toSave = function() {
    return '\n';
}

function Document() {
    this.content = [];
};

Document.prototype.parse = function(data) {
    var dataLines = data.split('\n');
    for (var i = 0; i < dataLines.length; i++) {
        this.parseLine(dataLines[i]);
    }
};

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
};

Document.prototype.findItem = function(key) {
    for (var i = 0; i < this.content.length; i++) {
        if (this.content[i] instanceof Item) {
            if (this.content[i].key == key) {
                return this.content[i];
            }
        }
    }
    return null;
};

Document.prototype.getItemValue = function(key) {
    if(this.findItem(key)) {
        return this.findItem(key).value;
    }
    return null;
};

Document.prototype.setItemValue = function(key, new_value) {
    if(this.findItem(key)) {
        this.findItem(key).value = new_value;
        return this.findItem(key).value;
    }
    return null;
};

Document.prototype.toSave = function() {
    var dataString = [];
    for (var i = 0; i < this.content.length - 1; i++) {
        dataString.push(this.content[i].toSave());
    }
    return dataString.join('');
};

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

Conf.prototype.getFilePath = function() {
    return this.filePath;
};

module.exports = Conf;
