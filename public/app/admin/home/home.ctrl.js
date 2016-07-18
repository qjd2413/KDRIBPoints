
(function() {

  var rootHomeCtrl = function($scope, brothers) {
    console.log(brothers);
  }


  angular.module('KDRPoints')
    .controller('rootHomeCtrl', ['$scope', 'brothers', rootHomeCtrl]);

})();

