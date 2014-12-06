'use strict';

gdayModule.controller('homeController', ['$scope', 'trainResource', function($scope, trainResource) {

    trainResource.getNextTrainByDirection(0).success(function(response){
        if(response.errorCode > 0){
            //TODO handle error
        }else{
            $scope.trains = response.result;
        }
    });

}]);