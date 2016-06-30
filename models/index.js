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

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
