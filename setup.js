'use strict';
var fs = require('fs');
var exec = require('child_process').exec;

//installed and assigned before main() is called, if error is thrown
var inquirer;
var q;
try {
    inquirer = require('inquirer');
    q = require('q');
} catch(e) {}

console.log('Initial setup for KDRIB Points');

var config;
try {
    config = require('./config/config');
    console.log('config.js found, importing data');
} catch(e) {
    console.log('Creating ./config/config.js');
    config = { logger: {}, oauth: {}, mysql: {}, session: {} };
}

var questions = [
    {
        type: 'confirm',
        name: 'console',
        message: 'Should logger output to console?',
    },{
        type: 'confirm',
        name: 'fileBool',
        message: 'Should logger output to file?'
    },{
        type: 'input',
        name: 'fileName',
        message: 'File name?',
        default: config.logger.file || 'points.log',
        when: function(answers) {
            return answers.fileBool;
        }
    },{
        type: 'input',
        name: 'clientId',
        message: 'Google Oauth client id?',
        default: config.oauth.client_id
    },{
        type: 'input',
        name: 'clientSecret',
        message: 'Google OAuth client secret?',
        default: config.oauth.client_secret
    },{
        type: 'input',
        name: 'mySqlUser',
        message: 'MySql username?',
        default: config.mysql.user
    },{
        type: 'input',
        name: 'mySqlPass',
        message: 'MySql password?',
        default: config.mysql.pass
    },{
        type: 'input',
        name: 'sessionSecret',
        message: 'Express session secret?',
        default: config.session.secret
    }
];

var generateConfigFile = function(template, config) {
    var splitTemplate = template.split(/<|>/);
    for(var i = 1; i < splitTemplate.length; i += 2) {
        var obj = config;
        var splitObj = splitTemplate[i].split('.');
        for(var j = 0; j < splitObj.length; j++) {
            obj = obj[splitObj[j]];
        }
        if(typeof obj === 'string') {
            obj = '\'' + obj + '\''; 
        }
        splitTemplate[i] = obj;
    }
    return splitTemplate.join('');
};

var promptUser = function() {
    return inquirer.prompt(questions)
    .then(function(answers) {
        config = {
            logger: {
                console: answers.console,
                file: answers.fileName || null
            },
            oauth: {
                client_id: answers.clientId,
                client_secret: answers.clientSecret
            },
            mysql: {
                user: answers.mySqlUser,
                pass: answers.mySqlPass
            },
            session: {
                secret: answers.sessionSecret
            }
        };
        return;
    });
};

var readTemplateFile = function() {
    var deferred = q.defer();
    fs.readFile('./config/template_config.js', 'utf8', function(err, data) {
        if(err) {
            deferred.reject(err);
            return;
        }
        deferred.resolve(data);
    });
    return deferred.promise;
};

var writeConfigFile = function(contents) {
    var deferred = q.defer();
    fs.writeFile('./config/config.js', contents, function(err) {
        if(err) {
            deferred.reject(err);
            return;
        }
        console.log('config created successfully');
        deferred.resolve();
    });
    return deferred.promise;
};

var runCmdAsync = function(cmd) {
    var deferred = q.defer();
    exec(cmd, function(error) {
        if(error) {
            deferred.reject(error);
            return;
        }
        deferred.resolve();
    });
    return deferred.promise;
};

var createDb = function(user, pass) {
    var deferred = q.defer();
    var useCmd = 'echo "CREATE DATABASE IF NOT EXISTS kdrpoints;"' +
        '| mysql -u ' + user + ' -p' + pass;
    exec(useCmd, function(error) {
        if(error) {
            deferred.reject(error);
            return;
        }
        console.log('database created successfully');
        deferred.resolve();
    });
    return deferred.promise;
};

var installDependencies = function() {
    return q.all([
        runCmdAsync('npm install'),
        runCmdAsync('bower install'),
        runCmdAsync('npm install -g gulp')
    ])
    .catch(function(error) {
        console.log('Error installing dependencies');
        console.log(error);
    }); 
};

var createConfig = function() {
    return promptUser()
    .then(readTemplateFile)
    .then(function(template) {
        var newConfig = generateConfigFile(template, config);  
        return writeConfigFile(newConfig);
    })
    .catch(function(err) {
        console.log('error:', err);  
    });
};

var main = function() { 
    console.log('\ninstalling dependencies (be patient!)...\n');
    q.all([
        createConfig(),
        installDependencies()
    ])
    .then(function() {
        console.log('dependencies installed successfully');
        console.log('create database (if needed)...');
        // i could add logic to do this regardless of whether dependencies are
        // installed, but creating the db is so fast it's not necessary
        return createDb(config.mysql.user, config.mysql.pass);
    })
    .then(function() {
        console.log('Setup successful! Run gulp to start the server.');
    })
    .catch(function(error) {
        console.log('error creating database!');
        console.log(error);
    });
};

if(!inquirer || !q) {
    console.log('\ninstalling inquirer and q');
    exec('npm install inquirer q', function(error) {
        if(error) {
            console.log(error);
            return;
        }
        inquirer = require('inquirer');
        q = require('q');

        main();
    });
} else {
   main();
}
