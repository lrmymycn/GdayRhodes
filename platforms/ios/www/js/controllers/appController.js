'use strict';

gdayModule.controller('appController',
    ['$scope', '$rootScope', '$ionicLoading', '$ionicModal', 'userService',
function($scope, $rootScope, $ionicLoading, $ionicModal, userService) {

    $rootScope.user = userService.getUser();

    $rootScope.loadingShow = function(){
        $ionicLoading.show({
            template: '<div id="global-loading"><i class="ion-loading-c"></i><span>Loading...</span></div>'
        });
    };

    $rootScope.loadingHide = function(){
        $ionicLoading.hide();
    };

}]);