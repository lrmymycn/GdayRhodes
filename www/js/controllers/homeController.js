'use strict';

gdayModule.controller('homeController',
    ['$scope',
        '$rootScope',
        '$interval',
        'homeResource',
        'userService', function($scope, $rootScope, $interval, homeResource, userService) {

    var countDownInterval;

	$('.bar-header').addClass('bar-transparent');

    $scope.isLoading = false;

    $scope.train = {
        toCity: $rootScope.user == null ? 1 : $rootScope.user.toCity,
        destination: '',
        delay: '',
        arriveHour : '',
        arriveMinute : '',
        arriveAmPm : '',
        hoursToGo: '',
        minutesToGo: ''
    }

    $scope.switchDirection = function(){
        if($scope.isLoading){
            return;
        }

        $scope.train.toCity = 1 - $scope.train.toCity;

        userService.saveTrainDirection($rootScope.user, $scope.train.toCity);

        loadHome();
    }

    function loadHome(){
        $scope.isLoading = true;

        homeResource.getHome($scope.train.toCity).success(function(response){
            $scope.isLoading = false;
            if(response.errorCode > 0){
                //TODO handle error
            }else{
                var nextTrain = response.result.nextTrain;
                $scope.train.destination = nextTrain.destination;

                var arriveTime = nextTrain.arriveTime;
                if(arriveTime == null){
                    return;
                }

                var arriveAt = moment(arriveTime, "HH:mm:ss");

                $scope.train.arriveHour = arriveAt.format('HH');
                $scope.train.arriveMinute = arriveAt.format('mm');
                $scope.train.arriveAmPm = arriveAt.format('A');

                if(nextTrain.delay > 0) {
                    var delayCopy = 'Min Delay';
                    if(nextTrain.delay > 1){
                        delayCopy = 'Mins Delay';
                    }
                    $scope.train.delay = nextTrain.delay + delayCopy;
                } else {
                    $scope.train.delay = "Running On Time"
                }

                calculateTimeToGo(arriveAt);
                startCountdown(arriveAt);
            }
        });
    }

    function calculateTimeToGo(arriveAt){
        var now = moment();
        var diff = arriveAt.diff(now, 'seconds');

        //if diff > 10 hours, we can guess the arrive time is in the next day
        //otherwise, we will pull the new arrival time

        if(diff < -(3600 * 10)) {
            arriveAt = arriveAt.add(1, 'days');
            diff = arriveAt.diff(now, 'seconds');
        }
        else if(diff < 0){
            loadHome();
            return;
        }

        var minutesToGo = Math.ceil(diff / 60);
        var hoursToGo = 0;
        if(minutesToGo >= 60){
            hoursToGo = Math.floor(minutesToGo / 60);
            minutesToGo = minutesToGo % 60;
        }
        var pad = '00';

        $scope.train.hoursToGo = (pad + hoursToGo).slice(-pad.length);
        $scope.train.minutesToGo = (pad + minutesToGo).slice(-pad.length);
    }

    function startCountdown(arriveAt){
        //Stop old count down before starting a new one
        stopCountdown();

        countDownInterval = $interval(function(){
            calculateTimeToGo(arriveAt);
        }, 5000);
    }

    function stopCountdown() {
        if (angular.isDefined(countDownInterval)) {
            $interval.cancel(countDownInterval);
            countDownInterval = undefined;
        }
    };

    $scope.doRefresh = function() {
        loadHome();
        $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        stopCountdown();

        console.log('countdown destroy');
    });

    loadHome();
}]);