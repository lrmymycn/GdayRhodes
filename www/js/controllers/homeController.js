'use strict';

gdayModule.controller('homeController', ['$scope', 'homeResource', function($scope, homeResource) {

	$('.bar-header').addClass('bar-transparent');

    $scope.direction = 1;

    $scope.switchDirection = function(){
        $scope.direction = 1 - $scope.direction;

        loadHome();
    }

    function loadHome(){
        homeResource.getHome($scope.direction).success(function(response){

            if(response.errorCode > 0){
                //TODO handle error
            }else{
                $scope.trains = response.result;
                //var a = moment().format("H:mm:ss");
                var now = moment();
                // var arriveTime = $scope.trains.nextTrain.arriveTime;
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
                $scope.arriveInHours = hoursToGo;
                $scope.arriveInMins = minutesToGo;

            }
        });
    }

    loadHome();
}]);