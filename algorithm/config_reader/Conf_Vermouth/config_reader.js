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
    return this.content;
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

Document.prototype.getItemValue = function(key) {
    var itemToFind = this.findItem(key);
    if(itemToFind) {
        return itemToFind.value;
    }
    return null;
};

Document.prototype.setItemValue = function(key, new_value) {
    var itemToUpdate = this.findItem(key);
    if(itemToUpdate) {
        itemToUpdate.value = new_value;
        return itemToUpdate.value;
    }
    return null;
};

Document.prototype.addItem = function(key, value) {
    if (this.getItemPosition(key) == -1) {
        this.content.push(new Item(key, value));
        return this.content;
    }
    else {
        console.log('The' + key + 'has already existed.');
    }
};

Document.prototype.addNote = function(key, content) {
    var itemPos = this.getItemPosition(key);
    if (itemPos != -1) {
        this.content.splice(itemPos, 0, new Note(content));
    }
    return null;
};

Document.prototype.deleteItem = function(key) {
    var itemToDelete = this.findItem(key);
    var itemPos = this.getItemPosition(key);
    if(itemPos != -1) {
        var note_content = '# ' + itemToDelete.key.toString() + '=' + itemToDelete.value.toString();
        this.content.splice(itemPos, 1, new Note(note_content));
    }
    return null;
};

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

Conf.prototype.getFilePath = function() {
    return this.filePath;
};

module.exports = Conf;
