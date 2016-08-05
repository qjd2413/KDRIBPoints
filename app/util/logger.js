'use strict';

var fs = require('fs');
var dateFormat = require('dateformat');
var lodash = require('lodash');

var config = require('../../config/config.js').logger;

var log = function(label, args) {
    var string = [];
    for(var i = 0; i < args.length; i++) {
      string.push(args[i]);
    }
    
    var time = dateFormat(new Date(), '[HH:MM:ss]');
    string = time + ' ' + label + ': ' + string.join(' ');

    if(config.console) {
      console.log(string);
    }

    if(config.file) {
      var today = new Date().toLocaleDateString();
      fs.readFile(config.file, 'utf8', function(err, content) {
        if(err) {
          if(err.errno !== -2) {
            //unknown error, log to console
            console.log(err);
            //attempt to log to file
            string = today + '\n' + err;
          } else {
            //file DNE, prepend date
            string = today + '\n' + string;
          }
        } else {
          //remove everything but daystamps
          content = content.split('\n');
          content = lodash.filter(content, function(line) {
           return line.match(/\d{1,2}\/\d{1,2}\/\d{1,4}/);
          });

          var lastDate = Date.parse(content[content.length-1]);
          var todayDate = Date.parse(today);
          if(todayDate > lastDate) {
            string = today + '\n' + string;
          }
        }

        fs.appendFileSync(config.file, string+'\n');
      });
    }
}

module.exports = {
  err: function() {
    log('ERR' , arguments);
  },
  warn: function() {
    log('WARN' , arguments);
  },
  info: function() {
    log('INFO', arguments);
  }
}
