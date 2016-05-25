var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var config = {
  root: rootPath,
  port: 3000,
  domain: 'http://localhost'
};
config.uri = config.domain + ':' + config.port;

module.exports = config;
