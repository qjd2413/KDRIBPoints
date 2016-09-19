
(function() {
    'use strict';

    var userService = function($q, httpService) {
        var user = null;

        var getUser = function() {
            if(user) {
                return $q.when(user);
            }
            return httpService.get('/brother/info')
                .then(function(info) {
                    user = {};
                    if(info && info.id) {
                        user = info;
                        user.name = info.firstName.charAt(0) + '. ' +
                                    info.lastName;
                        return user;
                    }
                });
        };

        return {

            // Returns authentication status(es) of current user
            // 'incomplete': a user that has an incomplete profile
            // 'user': regular user
            // 'admin': user with admin permissions
            authenticate: function() {
                return getUser()
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
            getUser: getUser,
            updateUser: function(newUser) {
                return httpService.post('/brother/update', newUser)
                    .then(function() {
                        user = null;
                        return getUser();
                    });
            }
        };
    };

    angular.module('KDRPoints')
        .factory('userService', userService);
}());
