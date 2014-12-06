'use strict';

gdayModule.controller('appController', ['$scope', '$rootScope', '$ionicModal', 'userService', function($scope, $rootScope, $ionicModal, userService) {

    $rootScope.user = userService.getUser();
    
}]);