'use strict';

gdayModule.controller('homeController', ['$scope', '$rootScope', 'homeResource', 'userService', function($scope, $rootScope, homeResource, userService) {

	$('.bar-header').addClass('bar-transparent');

    $scope.isLoading = false;
    $scope.direction = $rootScope.user == null ? 1 : $rootScope.user.direction;

    $scope.switchDirection = function(){
        if($scope.isLoading){
            return;
        }

        $scope.direction = 1 - $scope.direction;

        userService.saveTrainDirection($rootScope.user, $scope.direction);

        loadHome();
    }

    function loadHome(){
        $scope.isLoading = true;
        homeResource.getHome($scope.direction).success(function(response){
            $scope.isLoading = false;
            if(response.errorCode > 0){
                //TODO handle error
            }else{
                $scope.trains = response.result;

                $scope.hh = ($scope.trains.nextTrain.arriveTime).split(":")[0];
                $scope.mm = ($scope.trains.nextTrain.arriveTime).split(":")[1];
                var now = moment();

                var arriveAt = moment($scope.trains.nextTrain.arriveTime, "HH:mm:ss");
                var diff = arriveAt.diff(now, 'seconds');
                if(diff < 0) {
                    arriveAt = arriveAt.add(1, 'days');
                    diff = arriveAt.diff(now, 'seconds');
                }
                var minutesToGo = Math.ceil(diff / 60);
                var hoursToGo = 0;
                if(minutesToGo >= 60){
                    hoursToGo = Math.floor(minutesToGo / 60);
                    minutesToGo = minutesToGo % 60;
                }
                var pad = '00';

                $scope.arriveInHours = (pad + hoursToGo).slice(-pad.length);
                $scope.arriveInMins = (pad + minutesToGo).slice(-pad.length);

                if($scope.trains.nextTrain.delay) {
                    $scope.delay = $scope.trains.nextTrain.delay + "Mins Delay"
                } else {
                    $scope.delay = "Running On Time"
                }

            }
        });
    }

    $scope.doRefresh = function() {
        loadHome();
        $scope.$broadcast('scroll.refreshComplete');
    }

    loadHome();
}]);