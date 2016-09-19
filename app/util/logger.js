var fs = require('fs');
var dateFormat = require('dateformat');
var lodash = require('lodash');

var config = require('../../config/config.js').logger;

/* eslint-disable no-console */

(function() {
    'use strict';

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
                    var fileNotFound = -2;
                    if(err.errno === fileNotFound) {
                        // file DNE, prepend date
                        string = today + '\n' + string;
                    } else {
                        // unknown error, log to console
                        console.log(err);

                        // attempt to log to file
                        string = today + '\n' + err;
                    }
                } else {
                    // remove everything but daystamps
                    var splitContent = content.split('\n');
                    var dates = lodash.filter(splitContent, function(line) {
                        return line.match(/\d{1,2}\/\d{1,2}\/\d{1,4}/);
                    });

                    var lastDate = Date.parse(dates[content.length - 1]);
                    var todayDate = Date.parse(today);
                    if(todayDate > lastDate) {
                        string = today + '\n' + string;
                    }
                }

                fs.appendFile(config.file, string + '\n');
            });
        }
    };

    var functions = {
        err: function() {
            log('ERR', arguments);
        },
        warn: function() {
            log('WARN', arguments);
        },
        info: function() {
            log('INFO', arguments);
        }
    };

    module.exports = functions;
}());

/* eslint-enable no-console */
