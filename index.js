(function() {
  'use strict';

  var express = require('express');
  var session = require('express-session');
  var bodyParser = require('body-parser');
  var compress = require('compression');
  var glob = require('glob');
  var passport = require('passport');

  var config = require('./config/config');
  var mysql_config = require('./config/mysql_config');

  var Sequelize = require('sequelize');
  var SequelizeStore = require('connect-sequelize')(session);
  var db = new Sequelize(mysql_config.database, mysql_config.user, mysql_config.pass, 
      { logging: false });

  var app = express();

  app.use(session(
        { 
          secret: 'no thanks', 
          resave: true, 
          saveUninitialized: true,
          store: new SequelizeStore(db, {}, 'user-sessions')
        }
  ));
  app.use(passport.initialize());
  app.use(passport.session());

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
