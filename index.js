(function() {
  'use strict';

  var express = require('express');
  var session = require('express-session');
  var bodyParser = require('body-parser');
  var compress = require('compression');
  var glob = require('glob');
  var passport = require('passport');
  var Sequelize = require('sequelize');
  var SequelizeStore = require('connect-sequelize')(session);
  var cookieParser = require('cookie-parser');

  var config = require('./config/config');

  var app = express();

  var db = new Sequelize(config.mysql.database, config.mysql.user, 
                         config.mysql.pass, { logging: false });
  
  //session store
  app.use(cookieParser());
  app.use(session(
    { 
      secret: config.session.secret,
      resave: false, 
      saveUninitialized: false,
      store: new SequelizeStore(db, {}, 'user_sessions')
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
