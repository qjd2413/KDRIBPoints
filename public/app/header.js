angular.module('KDRPoints')
  .controller('header', ['$scope', '$http', function($scope, $http) {
    
    $http.get('/user/info')
    .then(function(info) {
      $scope.statusButton = {};
      if(info && info.data && info.data.id) {
        $scope.statusButton.text = 'Sign Out';
        $scope.statusButton.signin = false;

        info = info.data;
        $scope.user = info.firstName.charAt(0) + '. ' + info.lastName;
        $scope.statusButton.url = '/user/sign_out';
      } else {
        $scope.statusButton.text = 'Sign In';
        $scope.statusButton.signin = true;
        $scope.statusButton.url = '/user/sign_in';
      }
    }, function(err) {
      console.log('err');
    });

  }]);
