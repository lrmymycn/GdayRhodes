'use strict';

gdayModule.controller('homeController', ['$scope', '$rootScope', 'homeResource', 'userService', function($scope, $rootScope, homeResource, userService) {

	$('.bar-header').addClass('bar-transparent');

    $scope.isLoading = false;

    $scope.toCity = $rootScope.user == null ? 1 : $rootScope.user.toCity;

    $scope.switchDirection = function(){
        if($scope.isLoading){
            return;
        }

        $scope.toCity = 1 - $scope.toCity;

        userService.saveTrainDirection($rootScope.user, $scope.toCity);

        loadHome();
    }

    function loadHome(){
        $scope.isLoading = true;
        homeResource.getHome($scope.toCity).success(function(response){
            $scope.isLoading = false;
            if(response.errorCode > 0){
                //TODO handle error
            }else{
                $scope.trains = response.result;
                $scope.arrive = $scope.trains.nextTrain.arriveTime;
                $scope.hh = ($scope.arrive).split(":")[0];
                $scope.mm = ($scope.arrive).split(":")[1];

                var now = moment();

                var arriveAt = moment($scope.arrive, "HH:mm:ss");
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
    function updateTime(){
        var now = moment();
        var arriveAt = moment($scope.arrive, "HH:mm:ss");
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
        console.log($scope.arriveInMins);
    }


    $scope.doRefresh = function() {
        loadHome();
        $scope.$broadcast('scroll.refreshComplete');
    }

    loadHome();
    setInterval(function(){updateTime()},1000);
}]);