/* FILE: models/index.js
 * Taken from the sequelize docs, automatically syncs 
 * models and returns them, along with Sequelize and
 * the instance of sequelize
 */

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var mysql_config    = require('../config/mysql_config');
var sequelize = new Sequelize(mysql_config.database, mysql_config.user, mysql_config.pass, 
    { logging: false }
);
var db        = {};
var q = require('q');

fs
  .readdirSync(__dirname)
    .filter(function(file) {
          return (file.indexOf(".") !== 0) && (file !== "index.js");
            })
  .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
              });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
          db[modelName].associate(db);
            }
});

sequelize.sync()
  .then(function() {
    var auths = [
      { level: 'sysAdmin' },
      { level: 'eboard'},
      { level: 'jboard' },
      { level: 'chair' }
    ];  

    var auth_calls = [];
    for(var i = 0; i < auths.length; i++) {
      auth_calls.push(db.Authorization.findOrCreate({
        where: auths[i],
        defaults: auths[i]
      }));
    }
    q.all(auth_calls)
      .then(function(data) {
        var auth = {};
        var values;
        for(var i = 0; i < data.length; i++) {
          values = data[i][0].dataValues;
          auth[values.level] = values.id;
        }
        var positions = [
          { 
            name: 'sysAdmin',
            AuthorizationId: auth['sysAdmin']
          },{ 
            name: 'Consul', 
            AuthorizationId: auth['eboard']
          },{ 
            name: 'Senior Tribune', 
            AuthorizationId: auth['eboard'] 
          },{ 
            name: 'Junior Tribune', 
            AuthorizationId: auth['eboard'] 
          },{ 
            name: 'Quaestor', 
            AuthorizationId: auth['eboard'] 
          },{ 
            name: 'Praetor', 
            AuthorizationId: auth['eboard'] 
          },{
            name: 'Pontifex',
            AuthorizationId: auth['jboard']
          },{
            name: 'Centurion',
            AuthorizationId: auth['jboard']
          },{
            name: 'Aedile',
            AuthorizationId: auth['jboard']
          },{
            name: 'Custodian',
            AuthorizationId: auth['jboard']
          }
        ];
        var position_calls = [];
        for(var i = 0; i < positions.length; i++) {
          position_calls.push(db.Position.findOrCreate({
            where: positions[i]
          }));
        }
        return q.all(position_calls);

      })
      .then(function() {
        console.log('Database initialized.');
      })
      .fail(function(err) {
        console.log('Error initializing database');
        console.log(err);
      })
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
