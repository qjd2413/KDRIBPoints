(function() {
  'use strict';

  var express = require('express');
  var config = require('./config/config');
  var glob = require('glob');
  var bodyParser = require('body-parser');
  var compress = require('compression');

  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(compress());
  app.use(express.static(config.root + '/public'));

  var routers = glob.sync(config.root + '/app/routers/*.js');
  routers.forEach(function (router) {
      require(router)(app);
  });

  app.listen(config.port);
  console.log('Server listening on port', config.port);

})();
