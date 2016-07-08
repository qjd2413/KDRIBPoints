var fs = require('fs');
var dateFormat = require('dateformat');
var lodash = require('lodash');

var config = require('../../config/config.js').logger;

var log = function(label, args) {
    var string = [];
    for(var i in args) {
      string.push(args[i]);
    }
    var date = dateFormat(new Date(), '[HH:MM:ss]');
    string = date + ' ' + label + ': ' + string.join(' ');
    if(config.console) {
      console.log(string);
    }
    if(config.file) {
      fs.stat(config.file, function(err, stats) {
        var daystamp = false;
        var today = new Date().toLocaleDateString();
        if(err) {
          //file doesn't exist
          daystamp = true;
        } else {
          var content = fs.readFileSync(config.file, 'utf8');
          content = lodash.without(content.split('\n'), '');
          var i, lastDate;
          for(i = content.length-1; i >= 0; i--) {
            if(content[i].match(/\d{1,2}\/\d{1,2}\/\d{1,4}/)) {
              lastDate = Date.parse(content[i]);
              break;              
            } 
          }
          todayDate = Date.parse(today);
          daystamp = todayDate > lastDate;
        }
        if(daystamp) {
          string = today + '\n' + string;
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
