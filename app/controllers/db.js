
var models = require('../../models');
var Brother = models.Brother;
var Position = models.Position;
var SysAdmin = models.SysAdmin;
var Authorization = models.Authorization;

var q = require('q');
var lodash = require('lodash');

module.exports = {
  sign_in: function(id, name, email) {
    Brother.findOrCreate({ 
      where: {id: id},
      defaults: {
        firstName: name.givenName,
        lastName: name.familyName,
        email: email[0].value
      }
    }).then(function() {});
  },
  findUser: function(id) {
    return Brother.findById(id, {
      include: [SysAdmin, Position]
    });
  },
  findAllUsers: function() {
    return Brother.findAll({
      include: [SysAdmin, Position]
    });
  },
  updateUser: function(user, id) {
    return Brother.update(user,
      {
        where: { id: id },
        fields: ['pin']
      }
    );
  },
  userAuthorization: function(id) {
    return Brother.findById(id, {
      include: [SysAdmin, Position]
    }).then(function(brother) {
      if(brother.SysAdmin) {
        return 'sysadmin';
      };
      if(brother.Positions.length) {
        var positions = lodash.uniq(lodash.map(brother.Positions, 'dataValues.AuthorizationId'));
        return q.all(lodash.map(positions, function(positionId) {
          console.log(positionId);
          return Authorization.findById(positionId);
        })).then(function(authorizations) {
          authorizations = lodash.map(authorizations, 'dataValues');
          var maxAuth = lodash.minBy(authorizations, 'level');
          return maxAuth.name;
          console.log(maxAuth);
        });
      }
      return null;
    });
  },
  findAllPositions: function() {
    return Position.findAll();
  },
  getPosition: function(BrotherId) {
    return Position.findAll({
      where: { BrotherId: BrotherId }
    }).then(function(positions) {
      return lodash.map(positions, 'dataValues.name');
    });
  },
  assignPosition: function(brother, position) {
    return Position.update(
        { BrotherId: brother },
        {
          where: { id: position},
          fields: ['BrotherId']
        }
    );
  }
}

