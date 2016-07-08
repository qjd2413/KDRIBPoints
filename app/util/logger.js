var fs = require('fs');
var dateFormat = require('dateformat');

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
      fs.appendFileSync(config.file, string+'\n');
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
