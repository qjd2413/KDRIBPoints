
(function() {

  var rootHomeCtrl = function($scope, brothers, positions) {
    console.log(brothers);
    console.log(positions);
  }


  angular.module('KDRPoints')
    .controller('rootHomeCtrl', ['$scope', 'brothers', 'positions', rootHomeCtrl]);

})();

