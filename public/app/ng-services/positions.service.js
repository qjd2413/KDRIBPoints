
(function() {
    'use strict';

    var positionService = function(httpService) {
        return {
            getAllPositions: function() {
                return httpService.get('position/');
            },
            assign: function(brother, position) {
                if(brother && position) {
                    httpService.post('position/assign',
                        { brother: brother.id, position: position.id }
                    );
                }
            }
        };
    };

    angular.module('KDRPoints')
        .factory('positionService', positionService);
}());
