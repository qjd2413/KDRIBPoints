var lodash = require('lodash');
var q = require('q');

var models = require('../../models');
var positionCtrl = require('./PositionController.js');
var sysAdminCtrl = require('./SysAdminController.js');

(function() {
    'use strict';

    var Authorization = models.Authorization;
    var Brother = models.Brother;

    var functions = {

        // signIn - called only by passport
        // params:
        //   id: google id
        //   name: google name, not parsed
        //   email: array of emails
        signIn: function(id, name, email) {
            Brother.findOrCreate({
                where: { id: id },
                defaults: {
                    firstName: name.givenName,
                    lastName: name.familyName,
                    email: email[0].value
                }
            });
        },

        // authorization
        // params:
        //  id: user id
        //  chair: optional array of chair names
        // returns <promise>:
        //  resolves non-null if user is sysAdmin, eBoard, or a chair specified
        //    in the chair params. resolves null otherwise.
        authorization: function(id, chair) {
            return q.all([
                positionCtrl.heldBy(id),
                sysAdminCtrl.isAdmin(id)
            ]).then(function(resp) {
                var positions = resp[0];
                var sysAdmin = resp[1];
                if(sysAdmin) {
                    return 'sysadmin';
                }
                if(!positions.length) {
                    return null;
                }
                if(chair) {
                    var positionNames = lodash.map(positions,
                                                   'dataValues.name');
                    var chairArray = chair;
                    if(typeof chair === 'string') {
                        chairArray = [chair];
                    }
                    if(lodash.intersection(positionNames, chairArray)) {
                        return true;
                    }
                }

                // pull out all auth ids, remove duplicates
                var authIds = lodash.map(positions,
                                         'dataValues.AuthorizationId');
                authIds = lodash.uniq(authIds);

                return q.all(lodash.map(authIds, function(authId) {
                    return Authorization.findById(authId);
                })).then(function(authorizations) {
                    var authValues = lodash.map(authorizations, 'dataValues');

                    // the lower the level, the higher the authorization
                    var maxAuth = lodash.minBy(authValues, 'level');
                    return maxAuth.name;
                });
            });
        }
    };

    module.exports = functions;
}());
