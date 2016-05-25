
var external_config = require('config');

//DO NOT COMMIT YOUR CLIENT SECRET
var config = {
  client_id: 'YOUR CLIENT ID HERE',
  client_secret: 'YOUR CLIENT SECRET HERE',
  callback: external_config.uri + '/oauth/google_callback'
};

module.exports = config;
