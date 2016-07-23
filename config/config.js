var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var config = {
  root: rootPath,
  port: 3000,
  domain: 'http://localhost',
  logger: {
    console: true,
    file: 'kdrpoints.log'
  }
};
config.uri = config.domain + ':' + config.port;

module.exports = config;
