
(function() {
    'use strict';

    var userService = function(httpService) {
        return {

            // Returns authentication status(es) of current user
            // 'incomplete': a user that has an incomplete profile
            // 'user': regular user
            // 'admin': user with admin permissions
            authenticate: function() {
                return httpService.get('/brother/info')
                    .then(function(info) {
                        var authStatus = {};
                        if(info && info.id) {
                            authStatus.user = true;
                            if(info.authStatus === 'eboard' ||
                               info.authStatus === 'sysadmin') {
                                authStatus.admin = true;
                            }
                            if(info.incomplete) {
                                authStatus.incomplete = true;
                            }
                        }
                        return authStatus;
                    });
            },
            getUser: function() {
                return httpService.get('/brother/info')
                    .then(function(info) {
                        var user = {};
                        if(info && info.id) {
                            user = info;
                            user.name = info.firstName.charAt(0) + '. ' +
                                        info.lastName;
                            return user;
                        }
                    });
            },
            updateUser: function(newUser) {
                return httpService.post('/brother/update', newUser)
                    .then(function(stat) {
                        return stat === 'OK';
                    });
            }
        };
    };

    angular.module('KDRPoints')
        .factory('userService', ['httpService', userService]);
}());
