'use strict';

gdayModule.controller('aboutController',
    ['$scope',
        '$rootScope', function($scope, $rootScope) {

        $('.bar-header').removeClass('bar-transparent');
        $('.bar-header').addClass('bar-about');


        $scope.pasteFeedback = function(string) {
            var currentValue = document.getElementById("feedback-input").value
            if(currentValue.indexOf(string) < 0){
                document.getElementById("feedback-input").value = string + "\r" + currentValue;
            }
        }
}]);