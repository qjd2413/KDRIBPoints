angular.module('KDRPoints')
  .controller('header', ['$scope', '$http', function($scope, $http) {
    
    $http.get('/user/info')
    .then(function(info) {
      $scope.statusButton = {};
      if(info && info.data && info.data.id) {
        info = info.data;
        $scope.user = info.firstName.charAt(0) + '. ' + info.lastName;
      }
    }, function(err) {
      console.log('err');
    });

  }]);
