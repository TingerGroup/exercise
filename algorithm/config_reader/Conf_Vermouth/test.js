"use strict";

var fs = require('fs');

var path = './test.conf';
var config_reader = require('./config_reader.js');
var conf_test = new config_reader(path);

// 1.打印conf内容;
// 2.DSHELL属性值取出赋给DHOME;
// 3.添加配置项:test=123;
// 4.为添加的配置项添加注释;
// 5.将SKEL注释掉;
// 6.保存修改内容;
// 7.打印文件内容;

conf_test.init(function() {
    conf_test.setItemValue('DHOME',conf_test.getItemValue('DSHELL'));
    conf_test.addItem('test', '123');
    conf_test.addNote('test', '# This is a note.');
    conf_test.deleteItem('SKEL');
    conf_test.save(function() {
        fs.readFile(path,function(err, data) {
            console.log(data.toString());
        });
    });
});
